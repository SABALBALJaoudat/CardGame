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
    padding: '10px',
    border: '1px solid black',
    margin: '10px',
    width: '140px',
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    borderRadius: '10px',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}