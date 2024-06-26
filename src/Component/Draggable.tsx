import { useDraggable } from '@dnd-kit/core';
import { useDispatch } from 'react-redux';
import { setHoveredCardInfo } from '../Store/draggableSlice';

interface DraggableProps {
  monster: Monster;
}

export function Draggable({ monster }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: monster.id,
  });

  const dispatch = useDispatch();

  const containerStyle = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : '',
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

  const handleMouseEnter = () => {
    console.log(monster.id);
    dispatch(setHoveredCardInfo(monster));
  };

  return (
    <div ref={setNodeRef} style={containerStyle} {...listeners} {...attributes} onMouseEnter={handleMouseEnter}>
      <div style={innerStyle}>
        {monster.content}
      </div>
    </div>
  );
}
