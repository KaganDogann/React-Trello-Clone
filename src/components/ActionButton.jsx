import { Button, Card, Icon } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
import { addNewCardToList, addNewList } from "../store/actions/taskListActions";

export default function ActionButton({ list, listID }) {
  const [inputFormHidden, setInputFormHidden] = useState(true);
  const [text, setText] = useState({});

  const dispatch = useDispatch();

  const handleOpenInputForm = () => {
    setInputFormHidden(false);
  };

  const handleCloseInputForm = () => {
    setInputFormHidden(true);
  };

  const handleAddNewList = () => {
    //console.log("handleAddNewList", text);
    //var ar = text.text.split("");
    //console.log(ar)
    
      
      dispatch(addNewList(text));
    setText("");
    
    
  };

  const handleAddNewCardToList = () => {
    //console.log("handleAddNewCardToList");
    dispatch(addNewCardToList(text, listID));
    setText("");
  };

  const handleInputChange = (e) => {
    let text = e.target.value;
    //console.log(e)
    setText({ text });
  };

  const renderInputForm = () => {
    const placeholder = list
      ? "Enter list title..."
      : "Enter a title for this card...";
    const buttonTitle = list ? "Add List" : "Add Card";

    return (
      <div>
        <Card
          style={{
            minHeight: 80,
            minWidth: 272,
            padding: "6px 8px 2px",
          }}
        >
          <TextareaAutosize
            placeholder={placeholder}
            minRows={4}
            autoFocus
            value={text.text}
            onBlur={() => handleCloseInputForm()}
            onChange={handleInputChange}
            style={{
              resize: "none",
              width: "100%",
              overflow: "hidden",
              outline: "none",
              border: "none",
            }}
          ></TextareaAutosize>
        </Card>
        <InputForm>
          <Button
            onMouseDown={() =>
              list ? handleAddNewList() : handleAddNewCardToList()
            }
            variant="contained"
            style={{ color: "white", backgroundColor: "#5aac44" }}
          >
            {buttonTitle}
          </Button>
          <Icon style={{ marginLeft: 8, cursor: "pointer" }}>close</Icon>
        </InputForm>
      </div>
    );
  };

  const renderAddButtonForm = () => {
    const buttonText = list ? "Add another list" : "Add another card";
    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = list ? "white" : "inherit";
    const buttonTextBackground = list ? "rgba(0,0,0,.20)" : "inherit"; //?????????????

    return (
      <AddButtonForm
        onClick={() => handleOpenInputForm()}
        style={{
          opacity: buttonTextOpacity,
          color: buttonTextColor,
          backgroundColor: buttonTextBackground,
        }}
      >
        <Icon>add</Icon>
        <p>{buttonText}</p>
      </AddButtonForm>
    );
  };

  return inputFormHidden ? renderAddButtonForm() : renderInputForm();
}
const AddButtonForm = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 30px;
  height: 36px;
  width: 272px;
  padding-left: 10px;
  align-content: center;
  margin-left: 8px;
`;

const InputForm = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;
