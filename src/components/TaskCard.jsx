import { Card, CardContent, Typography, Icon } from "@material-ui/core";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { deleteCard } from "../store/actions/taskListActions";
import TaskCardModal from "./TaskCardModal";

const CardContainer = styled.div`
  margin: 0 0 8px 0;
  word-wrap: break-word;
  position: relative;
`;
const EditButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  top: 5px;
  opacity: 0.5;
  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;
const DeleteButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  bottom: 5px;
  opacity: 0.5;
  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;

export default function TaskCard({
  text,
  cardId,
  index,
  description,
  listId,
  listTitle,
}) {
  //console.log("TaskCard props cards:",text)

  const [modalHidden, setModalHidden] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteCard = () => {
    //console.log("handleDlete card compnennt içinde dispatch çağrıldı")
    dispatch(deleteCard(cardId, listId));
  };

  //console.log("TaskCard: cardId ve listId::", cardId,listId)
  return (
    <Draggable draggableId={String(cardId)} index={index}>
      {(provided) => (
        <CardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card>
            <EditButton onMouseDown={() => setModalHidden(true)}>
              edit
            </EditButton>
            <DeleteButton fontSize="small" onMouseDown={handleDeleteCard}>
              delete
            </DeleteButton>
            <CardContent>
              <Typography gutterBottom>{text}</Typography>
            </CardContent>
          </Card>
          {modalHidden ? (
            <TaskCardModal
              listTitle={listTitle}
              listId={listId}
              cardId={cardId}
              cardText={text}
              description={description}
              setModalHidden={setModalHidden}
            ></TaskCardModal>
          ) : null}
        </CardContainer>
      )}
    </Draggable>
  );
}
