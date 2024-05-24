import "./App.css";
import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';

export default function App() {
  const containers = ['A', 'B', 'C'];
  const [parent, setParent] = useState<string | null>(null);

  const handleDragEnd = ({ over }: { over: any }) => {
    console.log(over);
    if (over) {
      setParent(over.id);
    }
    else {
      setParent(null);
    }
  };

  const draggableMarkup = (
    <Draggable id="draggable">Drag me</Draggable>
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}
      {containers.map((id) => (
        <Droppable key={id} id={id}>
          {parent === id ? <Draggable id="draggable">Drag me</Draggable> : 'Drop here'}
        </Droppable>
      ))}
    </DndContext>
  );
}