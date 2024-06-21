import { RootState } from '@reduxjs/toolkit/query';
import { useSelector } from 'react-redux';

export function ZoomCard() {
  const hoveredCardInfo = useSelector((state: RootState) => state.draggable.hoveredCardInfo);

  return (
    <>
      {hoveredCardInfo && (
        <div className='card_detailed'>
          <div className='title'>
            id : {hoveredCardInfo.id}<br />
            content : {hoveredCardInfo.title}<br />
            attack : {hoveredCardInfo.attack}<br />
          </div>
        </div>
      )}
    </>
  )
}
