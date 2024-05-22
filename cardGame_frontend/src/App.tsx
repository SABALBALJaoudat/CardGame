import { useEffect, useRef } from 'react'
import './App.css'
import { Draggable, Droppable } from '@shopify/draggable';

function App() {
  const containerRef = useRef(null);
  const dropzoneRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && dropzoneRef.current) {
      const containers = [containerRef.current, dropzoneRef.current];
      
      const droppable_monsters = new Droppable(containers, {
        draggable: '.draggable-item_monsters',
        dropzone: '.dropzone',
      });

      droppable_monsters.on('drag:start', (event) => {
        console.log('Card dropped start');
      });

      droppable_monsters.on('droppable:dropped', (evt) => {
        console.log('Card dropped in dropzone');
      });

      return () => {
        droppable_monsters.destroy();
      };
    }
  }, []);

  return (
    <>
      <div ref={containerRef} className="cards-container dropzone">
        <div className="draggable-item_monsters">Card 1</div>
        <div className="draggable-item_monsters">Card 2</div>
        <div className="draggable-item_spells">Card 3</div>
      </div>
      <div ref={dropzoneRef} className="dropzone">
        Dropzone
      </div>
    </>
  )
}

export default App
