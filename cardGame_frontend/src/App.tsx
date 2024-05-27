import "./App.css";
import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';

export default function App() {
  const containers_monsters = ['zone_monsters_A', 'zone_monsters_B', 'zone_monsters_C'];
  const containers_spells = ['zone_spells_A', 'zone_spells_B', 'zone_spells_C'];

  const initialMonsters = [
    { id: 'draggable_monster_1', content: 'Monster 1' },
    { id: 'draggable_monster_2', content: 'Monster 2' },
    { id: 'draggable_monster_3', content: 'Monster 3' }
  ];

  const initialSpells = [
    { id: 'draggable_spell_1', content: 'Spell 1' },
    { id: 'draggable_spell_2', content: 'Spell 2' },
    { id: 'draggable_spell_3', content: 'Spell 3' }
  ];

  const [monsters, setMonsters] = useState(initialMonsters);
  const [spells, setSpells] = useState(initialSpells);
  const [parent, setParent] = useState<{ [key: string]: string | null }>({
    ...initialSpells.reduce((acc, spell) => {
      acc[spell.id] = null;
      return acc;
    }, {} as { [key: string]: string | null }),
    ...initialMonsters.reduce((acc, monster) => {
      acc[monster.id] = null;
      return acc;
    }, {} as { [key: string]: string | null })
  });

  const handleDragEnd = ({ active, over }: { active: any, over: any }) => {
    if (over) {
      if (active.id.startsWith('draggable_monster')) {
        if (containers_monsters.includes(over.id)) {
          setParent((prev) => ({
            ...prev,
            [active.id]: over.id
          }));
        }
      }
      if (active.id.startsWith('draggable_spell')) {
        if (containers_spells.includes(over.id)) {
          setParent((prev) => ({
            ...prev,
            [active.id]: over.id
          }));
        }
      }
    } else {
      setParent((prev) => ({
        ...prev,
        [active.id]: null
      }));
    }
  };

  return (
    <div className="main_content">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="hand">
          {monsters.map((monster) =>
            parent[monster.id] === null ? (
              <Draggable key={monster.id} id={monster.id}>
                {monster.content}
              </Draggable>
            ) : null
          )}
          {spells.map((spell) =>
            parent[spell.id] === null ? (
              <Draggable key={spell.id} id={spell.id}>
                {spell.content}
              </Draggable>
            ) : null
          )}
        </div>
        <div className="field">
          <div className="line">
            {containers_monsters.map((id) => (
              <Droppable key={id} id={id}>
                {monsters.map((monster) =>
                  parent[monster.id] === id ? (
                    <Draggable key={monster.id} id={monster.id}>
                      {monster.content}
                    </Draggable>
                  ) : null
                )}
                {monsters.every((monster) => parent[monster.id] !== id) && 'Monster field'}
              </Droppable>
            ))}
          </div>
          <div className="line">
            {containers_spells.map((id) => (
              <Droppable key={id} id={id}>
              {spells.map((spell) =>
                parent[spell.id] === id ? (
                  <Draggable key={spell.id} id={spell.id}>
                    {spell.content}
                  </Draggable>
                ) : null
              )}
              {spells.every((spell) => parent[spell.id] !== id) && 'Spell field'}
              </Droppable>
            ))}
          </div>
        </div>
      </DndContext>
    </div>
  );
}
