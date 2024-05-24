import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DroppableProps {
  id: string;
  children: React.ReactNode;
}

export function Droppable({ id, children }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    backgroundColor: isOver ? 'lightgreen' : 'white',
    padding: '20px',
    border: '1px solid black',
    margin: '10px',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}