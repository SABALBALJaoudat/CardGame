import { useSelector } from 'react-redux';

export function ZoomCard() {
  const hoveredCardInfo = useSelector((state: any) => state.draggable.hoveredCardInfo);

  return (
    <>
      {hoveredCardInfo && (
      <div className='card_detailed'>
        <div className='title'>
          id : {hoveredCardInfo.id}<br />
          content : {hoveredCardInfo.content}<br />
          attack : {hoveredCardInfo.attack}<br />
        </div>
      </div>
      )}
    </>
  )
}
