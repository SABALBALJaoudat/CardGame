import { useDraggable } from '@dnd-kit/core';
import { useDispatch } from 'react-redux';
import { setHoveredCardInfo } from '../Store/draggableSlice';
import { useState, useRef, useEffect } from 'react';

interface DraggableProps {
  monster: Monster;
}

export function Draggable({ monster }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: monster.id,
  });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [prevMousePos, setPrevMousePos] = useState({ x: 0, y: 0 });

  const dispatch = useDispatch();
  const isDraggingNow = useRef(false);
  const lastMoveTimestamp = useRef<number | null>(null);
  const resetInterval = useRef<number | null>(null);

  const containerStyle = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0) rotateY(${rotation.y}deg) rotateX(${rotation.x}deg)` : '',
    cursor: 'grab',
  };

  const innerStyle = {
    transform: `scale(${isDragging ? 1.2 : 1})`,
    outline: isDragging ? '5px solid pink' : '5px solid transparent',
    borderRadius: '10px',
    padding: '10px',
    backgroundColor: 'black',
    color: 'white',
    boxShadow: isDragging ? '0 20px 10px rgba(0, 0, 0, 0.75)' : 'rgba(50, 50, 93, 0.5) 0px 50px 100px -20px, rgba(0, 0, 0, 0.5) 0px 30px 60px -30px, rgba(10, 37, 64, 0.5) 0px -2px 6px 0px inset',
    transition: 'transform 0.2s ease',
    width: '100px',
    aspectRatio: '6 / 8',
    textAlign: 'center' as const,
  };

  const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
    const deltaX = e.clientX - prevMousePos.x;
    const deltaY = e.clientY - prevMousePos.y;

    const newRotationX = Math.min(20, Math.max(-20, rotation.x + deltaY * 0.1));
    const newRotationY = Math.min(30, Math.max(-30, rotation.y + deltaX * 0.1));

    setRotation({ x: newRotationX, y: newRotationY });
    setPrevMousePos({ x: e.clientX, y: e.clientY });
    isDraggingNow.current = true;
    lastMoveTimestamp.current = Date.now();

    if (resetInterval.current) {
      clearInterval(resetInterval.current);
      resetInterval.current = null;
    }
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    dispatch(setHoveredCardInfo(monster));
  };

  const handleMouseUp = () => {
    isDraggingNow.current = false;
  };

  useEffect(() => {
    // Fonction appelée à chaque intervalle pour réinitialiser la rotation
    const resetRotation = () => {
      if (isDraggingNow.current) {
        // Calcule le temps écoulé depuis le dernier mouvement de la souris
        const timeSinceLastMove = Date.now() - (lastMoveTimestamp.current || 0);

        // Si plus de 500ms se sont écoulées sans mouvement
        if (timeSinceLastMove > 500) {
          // Réduit progressivement la rotation vers zéro
          setRotation(prev => ({
            x: prev.x * 0.8, // Réduction plus rapide pour ramener la rotation vers zéro
            y: prev.y * 0.8,
          }));

          // Vérifie si la rotation est proche de zéro pour arrêter le reset
          if (Math.abs(rotation.x) < 0.5 && Math.abs(rotation.y) < 0.5) {
            // Réinitialise la rotation à zéro
            setRotation({ x: 0, y: 0 });
            // Arrête l'intervalle une fois la rotation réinitialisée
            clearInterval(resetInterval.current!);
          }
        }
      }
    };

    // Crée un intervalle qui appelle resetRotation toutes les 50ms
    resetInterval.current = window.setInterval(resetRotation, 50);

    // Nettoyage de l'intervalle lors du démontage du composant ou lors de la mise à jour de l'effet
    return () => {
      clearInterval(resetInterval.current!);
    };
  }, [rotation]); // Dépendance sur rotation pour que l'effet réagisse aux changements de rotation


  return (
    <div
      ref={setNodeRef}
      style={containerStyle}
      {...listeners}
      {...attributes}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
    >
      <div style={innerStyle}>
        {monster.title}
      </div>
    </div>
  );
}
