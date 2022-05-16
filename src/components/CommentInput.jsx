import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
  withStyles,
} from "@material-ui/core";
import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";

const CommentInputModal = withStyles({
  root: {
    width: "100%",
    "& label.Mui-focused": {
      color: "#2F80ED",
    },
    "& .MuiFormLabel-root": {
      fontSize: "0.875rem",
    },
    "& .MuiOutlinedInput-root": {
      fontSize: "0.875rem",
      padding: "18.5px 0px 18.5px 14px",
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

export const inputStyles = makeStyles(
  (theme) => ({
    container: {
      border: "1px solid #E0E0E0",
      boxSizing: "border-box",
      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "12px",
      minHeight: "100px",
      padding: theme.spacing(2),
    },
    commentButton: {
      width: "90%",
      marginRight: "10px",
      marginTop: "8px",
      borderRadius: "8px",
      fontWeight: 500,
      fontSize: "0.775rem",
      lineHeight: "14px",
      letterSpacing: "-0.035em",
      height: "32px",
    },
    commentError: {
      fontSize: "0.825rem",
      color: "#f44336",
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
      paddingLeft: theme.spacing(0.5),
    },
    buttonProgress: {
      color: "yellow",
      position: "absolute",
      marginTop: -25,
      marginLeft: 35,
    },
    avatar: {
      borderRadius: "8px",
    },
  }),
  { index: 1 }
);

export default function CommentInput() {
  const classes = inputStyles();

  //const { userData } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [time, setTime] = useState();
  const [commentError, setCommentError] = useState();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const handleButtonClick = () => {};

  //   const handleCommentButton = async () => {
  //     setLoading(true);
  //     setCommentError();
  //     if (comment.trim() <= 0) {
  //       setCommentError("You can't submit empty comment!");
  //       setLoading(false);
  //     } else {
  //       //const id = await GetUniqueId();
  //       const response = await handleButtonClick({
  //         id: id.data,
  //         uid: userData.uid,
  //         name: userData.name,
  //         picture: userData.picture,
  //         text: comment,
  //         time: time || "24 August at 20:43",
  //       });
  //       if (response) {
  //         setLoading(false);
  //       } else {
  //         setLoading(false);
  //         setCommentError(`Couldn't submit the comment!`);
  //       }
  //       setComment(" ");
  //     }
  //   };

  useEffect(() => {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString("en-EN", { month: "long" });
    const time = now.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    setTime(day + " " + month + " at " + time);
  }, [comment]);

  useEffect(() => {
    setTimeout(() => {
      setCommentError();
    }, 5000);
  }, [commentError]);

  return (
    <>
      <Grid
        container
        className={classes.container}
        justifyContent="space-around"
      >
        <Grid item sm={1} xs={2}>
          <p>user avatar</p>
        </Grid>
        <Grid item xs={10}>
          <CommentInputModal
            value={comment}
            onChange={handleChange}
            label="Write a comment..."
            variant="outlined"
            multiline
            maxRows={4}
            minRows={1}
          />
        </Grid>
        <Grid item container xs={12} justifyContent="flex-end">
          <Grid item sm={3} xs={4}>
            <Button
              className={classes.commentButton}
              variant="contained"
              color="primary"
              onClick={handleButtonClick}
              disabled={loading}
            >
              Comment
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        style={{ marginTop: "8px", display: commentError ? "block" : "none" }}
        item
        container
        xs={12}
      >
        <Typography className={classes.commentError}>{commentError}</Typography>
      </Grid>
    </>
  );
}
