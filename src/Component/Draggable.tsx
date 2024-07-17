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
    transition: 'transform 0.2s ease',
  };

  const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
    const deltaX = e.clientX - prevMousePos.x;
    const deltaY = e.clientY - prevMousePos.y;

    setRotation((prevRotation) => ({
      x: prevRotation.x + deltaY * 0.1,
      y: prevRotation.y + deltaX * 0.1,
    }));

    setPrevMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  // useEffect(() => {
  //   const handleDragStart = () => setIsDraggingNow(true);
  //   const handleDragEnd = () => setIsDraggingNow(false);

  //   window.addEventListener('dragstart', handleDragStart);
  //   window.addEventListener('dragend', handleDragEnd);

  //   return () => {
  //     window.removeEventListener('dragstart', handleDragStart);
  //     window.removeEventListener('dragend', handleDragEnd);
  //   };
  // }, []);

  const handleMouseEnter = (e: { clientX: any; clientY: any; }) => {
    setPrevMousePos({ x: e.clientX, y: e.clientY });
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
