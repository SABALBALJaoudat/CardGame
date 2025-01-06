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
    border: '1px solid black',
    width: '140px',
    height: '180px',
    // padding: '10px',
    margin: '10px',
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