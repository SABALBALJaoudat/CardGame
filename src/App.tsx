import "./App.css";
import { useEffect, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';
import { ZoomCard } from './ZoomCard';
import Score from "./Score";

export default function App() {
  const containers_monsters_J1 = ['zone_monsters_A', 'zone_monsters_B', 'zone_monsters_C'];
  const containers_monsters_J2 = ['zone_monsters_1', 'zone_monsters_2', 'zone_monsters_3'];

  const initialMonsters_J1 = [
    { id: 'draggable_monster_J1_1', content: 'Monster 1', attack: 1},
    { id: 'draggable_monster_J1_2', content: 'Monster 2', attack: 2},
    { id: 'draggable_monster_J1_3', content: 'Monster 3', attack: 3}
  ];

  const initialMonsters_J2 = [
    { id: 'draggable_monster_J2_1', content: 'Monster 1', attack: 1 },
    { id: 'draggable_monster_J2_2', content: 'Monster 2', attack: 2 },
    { id: 'draggable_monster_J2_3', content: 'Monster 3', attack: 3 }
  ];

  const [monsters_J1] = useState(initialMonsters_J1);
  const [monsters_J2] = useState(initialMonsters_J2);
  const [attack, setAttack] = useState(0);
  const [parent, setParent] = useState<{ [key: string]: string | null }>({
    ...initialMonsters_J2.reduce((acc, monster) => {
      acc[monster.id] = null;
      return acc;
    }, {} as { [key: string]: string | null }),
    ...initialMonsters_J1.reduce((acc, monster) => {
      acc[monster.id] = null;
      return acc;
    }, {} as { [key: string]: string | null })
  });

  const calculateAttack = (newParent: { [key: string]: string | null }) => {
    return initialMonsters_J1.reduce((acc, monster) => {
      if (containers_monsters_J1.includes(newParent[monster.id]!)) {
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
        if (active.id.startsWith('draggable_monster_J1')) {
          if (containers_monsters_J1.includes(over.id)) {
            const newParent = { ...parent, [active.id]: over.id };
            setParent(newParent);
            setAttack(calculateAttack(newParent));
          }
        }

        // Check if the active element is a spell and the containers have the same id has containers_spells
        if (active.id.startsWith('draggable_monster_J2')) {
          if (containers_monsters_J2.includes(over.id)) {
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
          {monsters_J1.map((monster) =>
            parent[monster.id] === null ? (
              <Draggable key={monster.id} monster={monster} />
            ) : null
          )}
          {monsters_J2.map((monster) =>
            parent[monster.id] === null ? (
              <Draggable key={monster.id} monster={monster} />
            ) : null
          )}
        </div>
        <div className="field">
          <div className="line">
            {containers_monsters_J1.map((id) => (
              <Droppable key={id} id={id}>
                {monsters_J1.map((monster) =>
                  parent[monster.id] === id ? (
                    <Draggable key={monster.id} monster={monster} />
                  ) : null
                )}
                {monsters_J1.every((monster) => parent[monster.id] !== id) && 'Monster field Player 1'}
              </Droppable>
            ))}
          </div>
          <div className="line">
            {containers_monsters_J2.map((id) => (
              <Droppable key={id} id={id}>
                {monsters_J2.map((monster) =>
                  parent[monster.id] === id ? (
                    <Draggable key={monster.id} monster={monster} />
                  ) : null
                )}
                {monsters_J2.every((monster) => parent[monster.id] !== id) && 'Monster field Player 2'}
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
