import React, { useEffect, useState } from "react";
import styles from "../../styles/CustomRender.module.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function PlansConfig({ checked, setchecked }) {
  
  const [days, setDays] = useState(0);
  
  const grid = 8;
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  
  useEffect(() => {
    if (checked) {
      const a = new Date(checked["start_date"]),
        b = new Date(checked["end_date"]),
        difference = dateDiffInDays(a, b);
      if (difference) setDays(difference);
    }
  }, [checked]);

  function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `operation-${k + offset}-${new Date().getTime()}`,
    content: `100`
  }));
  
  const [state, setState] = useState([getItems(10), [], [], [], [], [], [], [], [], []])

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    
    destClone.splice(droppableDestination.index, 0, removed);
  
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
  
    return result;
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    console.log(startIndex, endIndex)
    return result;
  };

  function onDragEnd(result) {
    const { source, destination } = result;
    // console.log(result);
    // dropped outside the list
    if (!destination) {
      return;
    }
    if ( state[parseInt(destination.droppableId)].length === 1 ) return;
    
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      // console.log("fix me here", newState)
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];
      // console.log("fix me here again", newState)

      setState(newState.filter((group) => group.length > -1));
    }
  }


  const dynamicStyles = (index) => {
    if(index){
      return getMachineListStyle()
    }
    return getFirstListStyle()
  }

  const getFirstListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgray",
    padding: 10,
    minHeight: 120,
    marginBottom: 20,
    display:"flex",
    width:'100%',
    overflow:'auto',
    border:'1px solid black',
    
  });
  
  const getMachineListStyle = isDraggingOver => ({
    background: isDraggingOver ? "gray" : "white",
    padding: 10,
    height: "80px",
    display:"flex",
    overflow:'hidden',
    width:"120px",
    border:'1px solid black',
  });

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    border:'1px solid black',
    margin :"3px",
    height:'50px',
    width:'120px',
    textAlign: 'center',
    // change background colour if dragging
    background: isDragging ? "yellow" : "yellow",
    // overflow:'hidden',
  
    // styles we need to apply on draggables
    ...draggableStyle
  });

  return (
    <div className={styles.main}>
      <div className={styles.createBtn}>
        <button onClick={() => setchecked("")}>Back</button>
      </div>
      {
        state.length > 0 ? (
          <>
          <div style={{ position: 'absolute', bottom: 530, right: 1100 }} >Machine 1</div>
          <div style={{ position: 'absolute', bottom: 450, right: 1100 }} >Machine 2</div>
          <div style={{ position: 'absolute', bottom: 370, right: 1100 }} >Machine 3</div>
          <div style={{ display: "flex", flexWrap: "wrap", width: '360px', position: 'absolute', bottom: 350, right: 700, }}>
            <DragDropContext onDragEnd={onDragEnd}>
              {state.map((el, ind) => (
                <Droppable key={ind} droppableId={`${ind}`}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={ dynamicStyles(ind) }
                      {...provided.droppableProps}
                    >
                      {el.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                }}
                              >
                                {item.content}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  )}
                </Droppable>
              ))}
            </DragDropContext>
          </div>
          </>
        ) : (<></>)
      }
    </div>
  );
}

export default PlansConfig;
