import { useEffect, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Draggable } from '../Component/Draggable';
import { Droppable } from '../Component/Droppable';
import { ZoomCard } from '../Component/ZoomCard';
import Score from "../Component/Score";
import { RootState } from '../Store/store';
import { useSelector } from 'react-redux';
// import { deck_J1 as initialDeck_J1, deck_J2 as initialDeck_J2 } from '../Data/DecksInitializer';

export default function Board() {

  //Plateau de jeu
  const containers_monsters_J1 = ['zone_monsters_J1_1', 'zone_monsters_J1_2', 'zone_monsters_J1_3'];
  const containers_monsters_J2 = ['zone_monsters_J2_1', 'zone_monsters_J2_2', 'zone_monsters_J2_3'];


  // Initialisation des états pour les mains et les decks
  // const [deck_J1] = useState(initialDeck_J1);
  // const [deck_J2] = useState(initialDeck_J2);
  const deck_J1: Card[] = useSelector((state: RootState) => state.decks.deck_J1);
  const deck_J2: Card[] = useSelector((state: RootState) => state.decks.deck_J2);
  const [hand_J1, setHand_J1] = useState(deck_J1.slice(0, 3));
  const [hand_J2, setHand_J2] = useState(deck_J2.slice(0, 3));
  const [attack_J1, setAttack_J1] = useState(0);
  const [attack_J2, setAttack_J2] = useState(0);
  const [parent, setParent] = useState<{ [key: string]: string | null }>({
    ...deck_J2.reduce((acc, monster) => {
      acc[monster.id] = null;
      return acc;
    }, {} as { [key: string]: string | null }),
    ...deck_J1.reduce((acc, monster) => {
      acc[monster.id] = null;
      return acc;
    }, {} as { [key: string]: string | null })
  });

  useEffect(() => {
    if (deck_J1.length > 0) {
      setHand_J1(deck_J1.slice(0, 3));
    }
    if (deck_J2.length > 0) {
      setHand_J2(deck_J2.slice(0, 3));
    }
    setParent({
      ...deck_J1.reduce((acc, monster) => {
        acc[monster.id] = null;
        return acc;
      }, {} as { [key: string]: string | null }),
      ...deck_J2.reduce((acc, monster) => {
        acc[monster.id] = null;
        return acc;
      }, {} as { [key: string]: string | null })
    });
  }, [deck_J1, deck_J2]);


  const shuffleHand = () => {
    // Filter out the cards that are already in hand_J1 or in the droppable area
    const filteredDeck_J1 = deck_J1.filter(card => !hand_J1.includes(card) && parent[card.id] === null);

    // Shuffle the filtered deck
    const shuffledDeck_J1 = [...filteredDeck_J1].sort(() => Math.random() - 0.5);

    // Calculate the number of cards needed to reach 3 in hand
    const cardsInHand = hand_J1.filter(card => parent[card.id] === null);
    const cardsInHandLength = hand_J1.filter(card => parent[card.id] === null).length;
    const cardsNeeded = 3 - cardsInHandLength;

    // Select the needed number of cards for hand_J1
    const newCards = shuffledDeck_J1.slice(0, cardsNeeded);
    setHand_J1(cardsInHand.concat(newCards));

    // Filter out the cards that are already in hand_J1 or in the droppable area
    const filteredDeck_J2 = deck_J2.filter(card => !hand_J2.includes(card) && parent[card.id] === null);

    // Shuffle the filtered deck
    const shuffledDeck_J2 = [...filteredDeck_J2].sort(() => Math.random() - 0.5);

    // Calculate the number of cards needed to reach 3 in hand
    const cardsInHand_J2 = hand_J2.filter(card => parent[card.id] === null);
    const cardsInHandLength_J2 = hand_J2.filter(card => parent[card.id] === null).length;
    const cardsNeeded_J2 = 3 - cardsInHandLength_J2;

    // Select the needed number of cards for hand_J1
    const newCards_J2 = shuffledDeck_J2.slice(0, cardsNeeded_J2);
    setHand_J2(cardsInHand_J2.concat(newCards_J2));

    // Reset the parent state
    setParent({
      ...deck_J1.reduce((acc, monster) => {
        acc[monster.id] = null;
        return acc;
      }, {} as { [key: string]: string | null }),
      ...deck_J2.reduce((acc, monster) => {
        acc[monster.id] = null;
        return acc;
      }, {} as { [key: string]: string | null })
    });
  };

  const calculateAttack_J1 = (newParent: { [key: string]: string | null }) => {
    return deck_J1.reduce((acc, monster) => {
      if (containers_monsters_J1.includes(newParent[monster.id]!)) {
        return acc + monster.attack;
      }
      return acc;
    }, 0);
  };

  const calculateAttack_J2 = (newParent: { [key: string]: string | null }) => {
    return deck_J2.reduce((acc, monster) => {
      if (containers_monsters_J2.includes(newParent[monster.id]!)) {
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
            setAttack_J1(calculateAttack_J1(newParent));
          }
        }

        // Check if the active element is a spell and the containers have the same id has containers_spells
        if (active.id.startsWith('draggable_monster_J2')) {
          if (containers_monsters_J2.includes(over.id)) {
            const newParent = { ...parent, [active.id]: over.id };
            setParent(newParent);
            setAttack_J2(calculateAttack_J2(newParent));
          }
        }
      }

      // If over is null, set the parent to null to replace it in the initial position
    } else {
      const newParent = { ...parent, [active.id]: null };
      setParent(newParent);
      setAttack_J1(calculateAttack_J1(newParent));
      setAttack_J2(calculateAttack_J2(newParent));
    }
  };

  useEffect(() => {
    setAttack_J1(calculateAttack_J1(parent));
    setAttack_J2(calculateAttack_J2(parent));
  }, [parent]);

  return (
    <div className="main_content">
      <div className="board">
        <a href="/">Acceuil</a>
        <DndContext onDragEnd={handleDragEnd}>
          <div className="hand">
            {hand_J1.map((monster) =>
              parent[monster.id] === null ? (
                <Draggable key={monster.id} monster={monster} />
              ) : null
            )}
          </div>
          <div className="field">
            <div className="line">
              {containers_monsters_J1.map((id) => (
                <Droppable key={id} id={id}>
                  {deck_J1.map((monster) =>
                    parent[monster.id] === id ? (
                      <Draggable key={monster.id} monster={monster} />
                    ) : null
                  )}
                  {deck_J1.every((monster) => parent[monster.id] !== id) && 'Monster field Player 1'}
                </Droppable>
              ))}
            </div>
            <button onClick={shuffleHand}>Mélange</button>
            <div className="line">
              {containers_monsters_J2.map((id) => (
                <Droppable key={id} id={id}>
                  {deck_J2.map((monster) =>
                    parent[monster.id] === id ? (
                      <Draggable key={monster.id} monster={monster} />
                    ) : null
                  )}
                  {deck_J2.every((monster) => parent[monster.id] !== id) && 'Monster field Player 2'}
                </Droppable>
              ))}
            </div>
          </div>
          <div className="hand">
            {hand_J2.map((monster) =>
              parent[monster.id] === null ? (
                <Draggable key={monster.id} monster={monster} />
              ) : null
            )}
          </div>
        </DndContext>
      </div>
      <div className="zoomCard">
        <ZoomCard />
        <Score attack_J1={attack_J1} attack_J2={attack_J2} shuffleHand={shuffleHand} />
      </div>
    </div>
  );
}
