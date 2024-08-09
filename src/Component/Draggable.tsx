import { useDraggable } from '@dnd-kit/core';
import { useDispatch } from 'react-redux';
import { setHoveredCardInfo } from '../Store/draggableSlice';
import { useState } from 'react';

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
    boxShadow: isDragging ? '0 20px 10px rgba(0, 0, 0, 0.5)' : 'none',
    transition: 'transform 0.2s ease',
    width: '100px',
    aspectRatio: '6 / 8',
    textAlign: 'center' as const,
  };

  const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
    const deltaX = e.clientX - prevMousePos.x;
    const deltaY = e.clientY - prevMousePos.y;

    // Limit rotation to 40 degrees
    const newRotationX = Math.min(20, Math.max(-20, rotation.x + deltaY * 0.1));
    const newRotationY = Math.min(30, Math.max(-30, rotation.y + deltaX * 0.1));
  
    setRotation({ x: rotation.x, y: newRotationY });
  
    setPrevMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const handleMouseEnter = (e: { clientX: any; clientY: any; }) => {
    // setPrevMousePos({ x: e.clientX, y: e.clientY });
    dispatch(setHoveredCardInfo(monster));
  };

  return (
    <div ref={setNodeRef} style={containerStyle} {...listeners} {...attributes} onMouseEnter={handleMouseEnter} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div style={innerStyle}>
        {monster.title}
      </div>
    </div>
  );
}
