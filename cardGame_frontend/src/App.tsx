import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Draggable, Droppable } from '@shopify/draggable';
import { Point, motion } from "framer-motion"

function App() {
  // const containerRef = useRef(null);
  // const dropzoneRef = useRef(null);
  // const constraintsRef = useRef(null);

  // useEffect(() => {
  //   if (containerRef.current && dropzoneRef.current) {
  //     const containers = [containerRef.current, dropzoneRef.current];

  //     const droppable_monsters = new Droppable(containers, {
  //       draggable: '.draggable-item_monsters',
  //       dropzone: '.dropzone',
  //     });

  //     droppable_monsters.on('drag:start', (event) => {
  //       console.log('Card dropped start');
  //     });

  //     droppable_monsters.on('droppable:dropped', (evt) => {
  //       console.log('Card dropped in dropzone');
  //     });

  //     return () => {
  //       droppable_monsters.destroy();
  //     };
  //   }
  // }, []);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const checkIfInDropzone = (point: Point) => {
    const dropzone = dropzoneRef.current?.getBoundingClientRect();
    return (
      dropzone &&
      point.x >= dropzone.left &&
      point.x <= dropzone.right &&
      point.y >= dropzone.top &&
      point.y <= dropzone.bottom
    );
  };

  const adjustPosition = (x: number, y: number) => {
    return { x: x - 50, y: y - 50 };
  }

  return (
    <>
      {/* <div ref={containerRef} className="cards-container dropzone">
        <div className="draggable-item_monsters">Card 1</div>
        <div className="draggable-item_monsters">Card 2</div>
        <div className="draggable-item_spells">Card 3</div>
      </div>
      <div ref={dropzoneRef} className="dropzone">
        Dropzone
      </div> */}
      <motion.div className="drag-area" ref={constraintsRef}>
      <motion.div
        className='drag-element'
        drag
        dragConstraints={constraintsRef}
        dragMomentum={false}
        animate={{ x: position.x, y: position.y }}
        onDragStart={(event, info) => {
          // setPosition({ x: info.point.x, y: info.point.y });
        }}
        onDragEnd={(event, info) => {
          const adjustedPoint = adjustPosition(info.point.x, info.point.y);
          setPosition({ x: adjustedPoint.x, y: adjustedPoint.y });
          console.log(info.point.x, info.point.y);
          // Check if the card is in the dropzone
          if (!checkIfInDropzone(info.point)) {
            // If not, reset to the initial position
            setPosition({ x: 0, y: 0 });
            console.log('Card dropped outside dropzone : ' + position.x + ' ' + position.y);
          } else {
            // Otherwise, update the position to the current position
            console.log('Card dropped inside dropzone : ' + adjustedPoint.x + ' ' + adjustedPoint.y);
          }
        }}
      >
        Card 1
      </motion.div>
      <div ref={dropzoneRef} className='dropzone'>
        Dropzone
      </div>
    </motion.div>
    </>
  )
}

export default App
