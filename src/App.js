import React, { useCallback, useRef, useState } from 'react';


const headerStyles = { width: '1000px', height: '50px', border: '1px solid black', position: 'relative', top: '400px', left: '300px' };
const cellStyles = { outline: '1px solid black', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', float: 'left' };

const App = ({ columns }) => {
  const mappedColumns = useRef(columns)
  const [isMoving, changeIsMoving] = useState(false)
  const clickX = useRef(0);
  const movingColumnIndex = useRef();
  const movingColumnData = useRef(null);
  const headerRef = useRef();
  const emptyColumn = useRef(null);
  const [mouseMove, changeMouseMove] = useState(0);
  const [startCoord, changeStartCoord] = useState(0)
  const triggerChange = useRef(0)

  const handleMouseMove = (e) => {
    const { clientX } = e
    const moveMouse = clientX - clickX.current;
    const movingElem = e.target.getBoundingClientRect();
    const headerRect = headerRef.current.getBoundingClientRect();
    if (moveMouse < 0) {

      if (movingElem.left <= headerRect.left) return
      if (columns[emptyColumn.current - 1]) {

        const lastCols = columns.slice((emptyColumn.current || 0), movingColumnIndex.current).reduce((acc, el) => acc + el.width, 0)

        if (-moveMouse - lastCols > (columns[emptyColumn.current - 1].width / 2)) {
          let newMappedColumns = [...mappedColumns.current];
          [newMappedColumns[emptyColumn.current], newMappedColumns[emptyColumn.current - 1]] = [newMappedColumns[emptyColumn.current - 1], newMappedColumns[emptyColumn.current]]
          mappedColumns.current = newMappedColumns
          emptyColumn.current = emptyColumn.current - 1;
        }
      }
    } else if (moveMouse > 0) {


      if (movingElem.right >= headerRect.right) return
      if (columns[emptyColumn.current + 1]) {

        const lastCols = columns.slice(movingColumnIndex.current, (emptyColumn.current || 0)).reduce((acc, el) => acc + el.width, 0)
        const lastColsMinOne = columns
          .slice(
            movingColumnIndex.current,
            (emptyColumn.current || 0) > 0 ? emptyColumn.current - 1 : 0)
          .reduce((acc, el) => acc + el.width, 0)
        console.log('MoveMouse ', moveMouse)
        console.log('Last cols ', lastCols)
        console.log('Last cols min one ', lastColsMinOne)
        console.log('Next column ', columns[emptyColumn.current + 1])
        console.log('Prev  column ', columns[emptyColumn.current - 1])




        if (moveMouse - lastCols > (columns[emptyColumn.current + 1].width / 2)) {
          console.log('вперёд')
          triggerChange.current = moveMouse;

          let newMappedColumns = [...mappedColumns.current];
          [newMappedColumns[emptyColumn.current], newMappedColumns[emptyColumn.current + 1]] = [newMappedColumns[emptyColumn.current + 1], newMappedColumns[emptyColumn.current]]
          mappedColumns.current = newMappedColumns
          emptyColumn.current = emptyColumn.current + 1;
        }

        if (moveMouse < triggerChange.current) {
          // console.log('назад', moveMouse, triggerChange.current, (mappedColumns.current[emptyColumn.current - 1] || {}).width, (mappedColumns.current[emptyColumn.current - 1] || {}).headerName);
          // triggerChange.current = (mappedColumns.current[emptyColumn.current] || {}).width;
          // let newMappedColumns = [...mappedColumns.current];
          // [newMappedColumns[emptyColumn.current], newMappedColumns[emptyColumn.current - 1]] = [newMappedColumns[emptyColumn.current - 1], newMappedColumns[emptyColumn.current]]
          // mappedColumns.current = newMappedColumns
          // emptyColumn.current = emptyColumn.current - 1;



        }


      }
    }
    changeMouseMove(moveMouse)

  }

  const handleMouseUp = (e) => {
    changeIsMoving(false)
    changeMouseMove(0);
    emptyColumn.current = null
    changeStartCoord(0)
    movingColumnIndex.current = 0;
    movingColumnData.current = null
    document.body.removeEventListener('mouseup', handleMouseUp);
    document.body.removeEventListener('mousemove', handleMouseMove);
  };


  const handleMouseDown = (e, i) => {
    clickX.current = e.clientX;
    const coords = e.target.getBoundingClientRect();
    changeStartCoord(coords.left - headerRef.current.getBoundingClientRect().left);
    changeIsMoving(true);
    movingColumnIndex.current = i;
    emptyColumn.current = i;
    movingColumnData.current = mappedColumns.current[i];
    document.body.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mousemove', handleMouseMove);
  }

  return (
    <div ref={headerRef} style={headerStyles} >
      {mappedColumns.current.map((el, index) =>
        <div
          key={el.headerName}
          onMouseDown={(e) => handleMouseDown(e, index)}
          style={{
            ...cellStyles,
            width: `${el.width}px`,
            backgroundColor: index === emptyColumn.current ? 'lightblue' : 'rgba(0,0,0,0)'
          }}
        >
          {index === emptyColumn.current ? null : el.headerName}
        </div>
      )}
      {isMoving &&
        <div
          style={{
            position: "relative",
            left: `${startCoord}px`,
            transform: `translateX(${mouseMove}px)`,
            width: `${movingColumnData.current.width}px`,
            height: '50px',
            outline: '1px solid black'
          }}
        >
          {movingColumnData.current.headerName}
        </div>}
    </div>
  )
}


export default App;