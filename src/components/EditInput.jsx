import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewDescriptionToCard } from "../store/actions/taskListActions";

const EditInputModal = withStyles({
  root: {
    width: "420px",
    "& label.Mui-focused": {
      color: "#2F80ED",
    },
    "& .MuiFormLabel-root": {
      fontSize: "0.875rem",
    },
    "& .MuiOutlinedInput-root": {
      fontSize: "0.875rem",
      "& fieldset": {
        border: "1px solid rgb(0 0 0 / 14%)",
        borderRadius: "4px",
        //border: "2px solid #2F80ED"
      },
      "&:hover fieldset": {
        border: "1px solid rgb(0 0 0 / 20%)",
      },
      "&.Mui-focused fieldset": {
        border: "1px solid rgb(0 0 0 / 20%)",
      },
    },
    "& .MuiFormHelperText-contained": {
      color: "red",
      marginLeft: "3px",
    },
  },
})(TextField);

const editStyles = makeStyles((theme) => ({
  addList: {
    fontSize: "0.825rem",
    padding: "6px 12px",
  },
  cancelButton: {
    padding: "8px",
  },
  error: {
    fontSize: "0.825rem",
    color: "#f44336",
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
  },
}));

export default function EditInput({
  handleClose,
  editInput,
  value,
  label,
  cardText,
  listId,
  cardId,
  description,
}) {
  const classes = editStyles();
  const [input, setInput] = useState(cardText);
  const [error, setError] = useState();
  //console.log("imput 1:", input)
  const dispatch = useDispatch();

  const handleChange = (e) => {
    //console.log(e.target.value);
    //console.log("handleChange çalıştı")
    setInput(e.target.value);
    setError();
  };

  const handleSaveButtonClick = () => {
    setError();
    //console.log("input",input);
    if (!input) {
      setError("Input field cannot be empty!");
     
    } else {
     
      dispatch(addNewDescriptionToCard(input, cardId, listId, cardText));
      handleClose();
    }
  };

  useState(() => {
    setInput(description); //BU DÜNYANIN EN GÜZEL ŞEYİ KARDEŞİM.
  }, [description]);

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <EditInputModal
            onChange={handleChange}
            value={input}
            autoFocus
            variant="outlined"
            margin="dense"
            multiline
            minRows={2}
            maxRows={10}
          />
        </Grid>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          style={{ paddingTop: "4px" }}
        >
          <Grid item>
            <Button
              className={classes.addList}
              variant="contained"
              color="primary"
              onClick={handleSaveButtonClick}
            >
              Save
            </Button>
          </Grid>
          <Grid item xs={2}>
            <IconButton
              style={{ marginLeft: "16px" }}
              className={classes.cancelButton}
              aria-label="cancel"
              onMouseDown={() => {
                
                setInput(description);
                handleClose();
              }}
            >
              <Close />
            </IconButton>
          </Grid>
        </Grid>
        {error && <Typography className={classes.error}>{error}</Typography>}
      </Grid>
    </div>
  );
}
