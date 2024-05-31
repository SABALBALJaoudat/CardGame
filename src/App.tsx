import "./App.css";
import { useEffect, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';
import { ZoomCard } from './ZoomCard';
import Score from "./Score";

export default function App() {
  const containers_monsters = ['zone_monsters_A', 'zone_monsters_B', 'zone_monsters_C'];
  const containers_spells = ['zone_spells_A', 'zone_spells_B', 'zone_spells_C'];

  const initialMonsters = [
    { id: 'draggable_monster_1', content: 'Monster 1', attack: 1},
    { id: 'draggable_monster_2', content: 'Monster 2', attack: 2},
    { id: 'draggable_monster_3', content: 'Monster 3', attack: 3}
  ];

  const initialSpells = [
    { id: 'draggable_spell_1', content: 'Spell 1' },
    { id: 'draggable_spell_2', content: 'Spell 2' },
    { id: 'draggable_spell_3', content: 'Spell 3' }
  ];

  const [monsters] = useState(initialMonsters);
  const [spells] = useState(initialSpells);
  const [attack, setAttack] = useState(0);
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

  const calculateAttack = (newParent: { [key: string]: string | null }) => {
    return initialMonsters.reduce((acc, monster) => {
      if (containers_monsters.includes(newParent[monster.id]!)) {
        return acc + monster.attack;
      }
      return acc;
    }, 0);
  };

  const handleDragEnd = ({ active, over }: { active: any, over: any }) => {
    // console.log(active);
    // console.log(over);
    if (over) {

      // Check if the parent have a child already
      if (!Object.values(parent).includes(over.id)) {

        // Check if the active element is a monster and the containers have the same id has containers_monsters
        if (active.id.startsWith('draggable_monster')) {
          if (containers_monsters.includes(over.id)) {
            const newParent = { ...parent, [active.id]: over.id };
            setParent(newParent);
            setAttack(calculateAttack(newParent));
          }
        }

        // Check if the active element is a spell and the containers have the same id has containers_spells
        if (active.id.startsWith('draggable_spell')) {
          if (containers_spells.includes(over.id)) {
            setParent((prev) => ({
              ...prev,
              [active.id]: over.id
            }));
          }
        }
      }

    // If over is null, set the parent to null to replace it in the initial position
    } else {
      const newParent = { ...parent, [active.id]: null };
      setParent(newParent);
      setAttack(calculateAttack(newParent));
    }
  };

  useEffect(() => {
    setAttack(calculateAttack(parent));
  }, [parent]);

  return (
    <div className="main_content">
      <div className="board">
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
      <div className="zoomCard">
        <ZoomCard/>
        <Score attack={attack}/>
      </div>
    </div>
  );
}
