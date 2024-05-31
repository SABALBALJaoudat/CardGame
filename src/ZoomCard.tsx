import { useSelector } from 'react-redux';

export function ZoomCard() {
  const hoveredId = useSelector((state: any) => state.draggable.hoveredId);

  return (
    <div>zoomCard : {hoveredId}</div>
  )
}
