import { Icon } from "@material-ui/core";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { deleteList, editListTitle } from "../store/actions/taskListActions";
import ActionButton from "./ActionButton";
import TaskCard from "./TaskCard";

const ListContainer = styled.div`
  background-color: #8f8f8f;
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  height: 100%;
  margin: 0 8px 0 8px;
`;

const StyledInput = styled.input`
  width: 290px;
  border: none;
  outline-color: blue;
  border-radius: 3px;
  margin-top: 16px;
  margin-bottom: 20px;
  padding: 5px;
`;
const TitleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const ListTitle = styled.h4`
  transition: background 0.3s ease-in;
  ${TitleContainer}:hover & {
    background: #ccc;
  }
`;
const DeleteButton = styled(Icon)`
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  opacity: 0.4;
  &:hover {
    opacity: 0.8;
  }
`;
export default function List({ title, cards, listID, index }) {
  //console.log("List props cards:", cards,listID);

  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setListTitle] = useState(title);

  const dispatch = useDispatch();

  const renderEditInput = () => {
    //console.log("renderEditInput ÇALIŞTI");
    return (
      <form onSubmit={handleFinishEditing}>
        <StyledInput
          type="text"
          value={listTitle}
          onChange={handleChange}
          autoFocus
          onFocus={handleFocus}
          onBlur={handleFinishEditing}
        />
      </form>
    );
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleChange = (e) => {
    e.preventDefault();
    //console.log(e);
    setListTitle(e.target.value);
  };

  const handleFinishEditing = (e) => {
    //console.log("handleFinishEditing");
    setIsEditing(false);
    dispatch(editListTitle(listID, listTitle));
  };

  const handleDeleteList = () => {
    dispatch(deleteList(listID));
  };

  const renderTitleList = () => {
    //console.log("renderTitleList çalıştı");
    return (
      <TitleContainer>
        <ListTitle onClick={() => setIsEditing(true)}>{title}</ListTitle>
        <DeleteButton onClick={handleDeleteList}>delete</DeleteButton>
      </TitleContainer>
    );
  };

  return (
    <Draggable draggableId={String(listID)} index={index}>
      {(provided) => (
        <ListContainer
          {...provided.draggableProps} //This controls the movement of the draggable when it is dragging and not dragging.
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={String(listID)}>
            {(provided) => (
              <div>
                <div>{isEditing ? renderEditInput() : renderTitleList()}</div>
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {cards.map((card, index) => (
                    <TaskCard
                      description={card.cardDescription}
                      index={index}
                      text={card.text}
                      key={card.cardId}
                      cardId={card.cardId}
                      listId={listID}
                      listTitle={title}
                    ></TaskCard>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
          <ActionButton listID={listID}></ActionButton>
        </ListContainer>
      )}
    </Draggable>
  );
}

/*
<IconButton
                    style={{ marginLeft: "220px" }} //bunu title div i içine almam gerekli unutma
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onMouseDown={handleSetEditingOpen}>
                      <Icon style={{ marginRight: "5px" }}>edit</Icon> Düzenle{" "}
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                      <Icon style={{ marginRight: "5px" }}>delete</Icon> Sil{" "}
                    </MenuItem>
                  </Menu>

                  */
