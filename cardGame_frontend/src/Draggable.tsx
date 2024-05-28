import React from 'react';
import { useDraggable } from '@dnd-kit/core';

interface DraggableProps {
  id: string;
  children: React.ReactNode;
}

export function Draggable({ id, children }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });

  const containerStyle = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : '',
    cursor: 'grab',
  };

  const innerStyle = {
    transform: `scale(${isDragging ? 1.2 : 1})`,
    outline: isDragging ? '5px solid pink' : '5px solid transparent',
    borderRadius: '10px',
    padding: '10px',
    backgroundColor: 'rebeccapurple',
    color: 'white',
    transition: 'transform 0.2s ease',
  };

  const handleMouseEnter = () => {
    console.log(id);
  };

  return (
    <div ref={setNodeRef} style={containerStyle} {...listeners} {...attributes} onMouseEnter={handleMouseEnter}>
      <div style={innerStyle}>
        {children}
      </div>
    </div>
  );
}
