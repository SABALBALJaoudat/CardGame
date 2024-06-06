import { useSelector } from 'react-redux';

export function ZoomCard() {
  const hoveredId = useSelector((state: any) => state.draggable.hoveredId);

  return (
    <>
      {hoveredId && (
      <div className='card_detailed'>
        <div className='title'>
          {hoveredId}
        </div>
      </div>
      )}
    </>
  )
}
