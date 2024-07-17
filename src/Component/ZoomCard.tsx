import { RootState } from '../Store/store';
import { useSelector } from 'react-redux';

interface HoveredCardInfo {
  id: number;
  title: string;
  attack: number;
  energie: number;
}

export function ZoomCard() {
  const hoveredCardInfo = useSelector((state: RootState) => state.draggable.hoveredCardInfo) as HoveredCardInfo | null;

  return (
    <>
      {hoveredCardInfo && (
        <div className='card_detailed'>
          <div className='title'>
            id : {hoveredCardInfo.id}<br />
            content : {hoveredCardInfo.title}<br />
            attack : {hoveredCardInfo.attack}<br />
            energie : {hoveredCardInfo.energie}<br />
          </div>
        </div>
      )}
    </>
  )
}
