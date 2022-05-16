import React from "react";
import List from "../components/List";
import styled from "styled-components";
import ActionButton from "../components/ActionButton";
import { useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { sort } from "../store/actions/taskListActions";
import { Droppable } from "react-beautiful-dnd";

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
export default function Dashboard() {
  const { taskListItems } = useSelector((state) => state.taskList);
  const dispatch = useDispatch();
  //console.log("Dashboard state taskListItems:", taskListItems);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    //console.log("onDragEnd result:", result);
    if (!destination) {
      return;
    }

    dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-lists" direction="horizontal" type="list">
        {(provided) => (
          <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
            {taskListItems.map((taskListItem, index) => (
              <List
                index={index}
                title={taskListItem.title}
                cards={taskListItem.cards}
                listID={taskListItem.listId}
                key={taskListItem.listId}
              ></List>
            ))}
            {provided.placeholder}
            <ActionButton list></ActionButton>
          </ListContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
}
