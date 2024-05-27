import "./App.css";
import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';

export default function App() {
  const containers_monsters = ['zone_monsters_A', 'zone_monsters_B', 'zone_monsters_C'];
  const containers_magictrap = ['zone_magictrap_A', 'zone_magictrap_B', 'zone_magictrap_C'];
  const [parent, setParent] = useState<{ [key: string]: string | null }>({
    draggable_monster: null,
    draggable_magic: null
  });

  const handleDragEnd = ({ active, over }: { active: any, over: any }) => {
    console.log(active);
    console.log(over);
    if (over) {
      if (active.id === 'draggable_monster') {
        if (over.id === 'zone_monsters_A' || over.id === 'zone_monsters_B' || over.id === 'zone_monsters_C') {
          setParent((prev) => ({
            ...prev,
            [active.id]: over.id
          }));
        }
      }
      if (active.id === 'draggable_magic') {
        if (over.id === 'zone_magictrap_A' || over.id === 'zone_magictrap_B' || over.id === 'zone_magictrap_C') {
          setParent((prev) => ({
            ...prev,
            [active.id]: over.id
          }));
        }
      }
      // setParent((prev) => ({
      //   ...prev,
      //   [active.id]: over.id
      // }));
    } else {
      setParent((prev) => ({
        ...prev,
        [active.id]: null
      }));
    }
  };

  const draggableMarkup_monsters = (
    <Draggable id="draggable_monster">Monster</Draggable>
  );
  const draggableMarkup_magic = (
    <Draggable id="draggable_magic">Magic/Trap</Draggable>
  );

  return (
    <div className="main_content">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="hand">
        {parent.draggable_monster === null ? draggableMarkup_monsters : null}
        {parent.draggable_magic === null ? draggableMarkup_magic : null}
        </div>
        <div className="map_card">
          <div>
            {containers_monsters.map((id) => (
              <Droppable key={id} id={id}>
                {parent.draggable_monster === id ? draggableMarkup_monsters : 'Drop here'}
              </Droppable>
            ))}
          </div>
          <div>
            {containers_magictrap.map((id) => (
              <Droppable key={id} id={id}>
                {parent.draggable_magic === id ? draggableMarkup_magic : 'Drop here'}
              </Droppable>
            ))}
          </div>
        </div>
      </DndContext>
    </div>
  );
}