import {
  Backdrop,
  Grid,
  IconButton,
  makeStyles,
  Modal,
  Typography,
} from "@material-ui/core";
import { Clear, Description, Edit } from "@material-ui/icons";
import React, { useState } from "react";
import CommentInput from "./CommentInput";
import EditInput from "./EditInput";
import TaskCardModalTitleInput from "./TaskCardModalTitleInput";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: theme.spacing(8),
    overflow: "scroll",
    "&::-webkit-scrollbar": {
      width: "0",
      background: "transparent",
    },
  },
  paper: {
    backgroundColor: "white",
    width: "675px",
    minHeight: "350px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
    borderRadius: "8px",
    outlineColor: "white",
    outlineWidth: "0px",
    borderStyle: "solid",
  },
  paperItem: {
    backgroundColor: "white",
    minwidth: "100px",
    minHeight: "150px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
    borderRadius: "8px",
    outlineColor: "white",
    outlineWidth: "0px",
    borderStyle: "solid",
  },
  containerModal: {
    backgroundColor: "white",
    width: "675px",
    minHeight: "350px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
    borderRadius: "8px",
    outlineColor: "white",
    outlineWidth: "0px",
  },
  closeButton: {
    backgroundColor: "#2F80ED",
    color: "white",
    boxShadow: "0px px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    width: "2rem",
    height: "2rem",
    padding: theme.spacing(2.25),
    zIndex: "100",
    position: "absolute",
    marginTop: theme.spacing(-1),
    marginRight: theme.spacing(-1),
    "&:hover": {
      backgroundColor: "rgb(32, 89, 165)",
    },
  },
  editButton: {
    borderRadius: "1px",
    width: "50%",
    padding: "0px",
    paddingBottom: theme.spacing(0.5),
    paddingTop: theme.spacing(0.5),
  },
  listTitle: {
    fontWeight: 600,
    fontSize: "0.725rem",
    lineHeight: "15px",
    letterSpacing: "-0.035em",
    marginBottom: theme.spacing(2.5),
  },
  gridContainer: {
    padding: theme.spacing(2.5),
  },
  taskTitleWrapper: {
    [theme.breakpoints.down("xs")]: {
      marginTop: "24px",
    },
  },
  gridItem: {
    marginBottom: theme.spacing(3),
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: "0.725rem",
    letterSpacing: "-0.035em",
    color: "#BDBDBD",
    marginLeft: theme.spacing(1),
    lineHeight: "1rem",
  },
  sectionIcon: {
    fontSize: "1rem",
    color: "#BDBDBD",
  },
  icon: {
    fontSize: "1rem",
  },
  button: {
    border: "1px solid #BDBDBD",
    borderRadius: "8px",
    height: "24px",
  },
  text: {
    lineHeight: "15px",
    letterSpacing: "-0.035em",
    fontSize: "0.725rem",
    fontWeight: "600",
  },
}));

export default function TaskCardModal({
  description,
  setModalHidden,
  cardText,
  listId,
  cardId,
  listTitle,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [displayEditArea, setDisplayEditArea] = useState(false);
  const [displayEditTitle, setDisplayEditTitle] = useState(false);

  //console.log("taskCardModal:", listId, cardId);

  const handleEditTitleButtonClick = () => {
    setDisplayEditTitle(!displayEditTitle);
  };

  const closeEditTitle = () => {
    setDisplayEditTitle(false);
  };

  const handleEditButtonClick = () => {
    setDisplayEditArea(!displayEditArea);
  };

  const closeEditArea = () => {
    //console.log("closeEditArea");
    setDisplayEditArea(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("handleClose");
    setModalHidden(false);
    setOpen(false);
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.containerModal}>
          <Grid container className={classes.gridContainer}>
            <Grid
              className={classes.gridItem}
              item
              container
              justifyContent="flex-end"
              xs={12}
            >
              <IconButton
                onClick={() => handleClose()}
                className={classes.closeButton}
                aria-label="delete"
              >
                <Clear />
              </IconButton>
            </Grid>
            {/*this is the left side of modal in big screens */}
            <Grid className={classes.gridItem} item container sm={8} xs={12}>
              <Grid className={classes.taskTitleWrapper} item container xs={12}>
                <Grid
                  item
                  xs={10}
                  style={{ marginBottom: displayEditTitle ? "12px" : "0px" }}
                >
                  {displayEditTitle ? (
                    <TaskCardModalTitleInput
                      cardText={cardText}
                      listId={listId}
                      cardId={cardId}
                      handleClose={closeEditTitle}
                      editInput={cardText}
                      value={cardText}
                      label="Title"
                    />
                  ) : (
                    <Typography className={classes.taskTitle}>
                      {cardText}
                    </Typography>
                  )}
                </Grid>

                <Grid
                  item
                  container
                  justifyContent="flex-end"
                  alignItems="flex-start"
                  xs={2}
                  style={{ marginBottom: "16px" }}
                >
                  <IconButton
                    onClick={handleEditTitleButtonClick}
                    className={classes.editButton}
                  >
                    <Edit style={{ fontSize: "1rem" }} />
                  </IconButton>
                </Grid>
              </Grid>

              {/* in list -- progress */}
              <Grid item container xs={12}>
                <Grid item>
                  <Typography
                    style={{ color: "#BDBDBD" }}
                    className={classes.listTitle}
                  >
                    in list
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography
                    style={{ marginLeft: "8px" }}
                    className={classes.listTitle}
                  >
                    {listTitle}
                  </Typography>
                </Grid>
              </Grid>
              {/* description kısmı */}
              <Grid item container xs={12} style={{ marginBottom: "16px" }}>
                <Grid item container style={{ width: "100px" }}>
                  {/* description sectionTitle */}
                  <Grid item container xs={12}>
                    <Grid item>
                      <Description
                        className={classes.sectionIcon}
                      ></Description>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.sectionTitle}>
                        Description
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {/* description sectionTitle bitişi */}
                <Grid item xs={2}>
                  <IconButton
                    onClick={handleEditButtonClick}
                    className={classes.button}
                    aria-label="edit"
                  >
                    <Edit className={classes.icon}></Edit>
                    <Typography
                      style={{ marginLeft: "8px" }}
                      className={classes.text}
                    >
                      Edit
                    </Typography>
                  </IconButton>
                </Grid>
              </Grid>
              {/*description itself */}
              <Grid
                style={{
                  display: displayEditArea ? "none" : "flex",
                  marginBottom: "24px",
                }}
                item
                container
                xs={12}
              >
                <Typography className={classes.description}>
                  {description}
                </Typography>
              </Grid>
              {/*edit description */}
              <Grid
                style={{
                  display: displayEditArea ? "flex" : "none",
                  marginBottom: "24px",
                }}
                item
                container
                xs={12}
              >
                <EditInput
                  handleClose={closeEditArea}
                  cardText={cardText}
                  listId={listId}
                  cardId={cardId}
                  description={description}
                ></EditInput>
              </Grid>

              <Grid item container xs={12} style={{ marginBottom: "8px" }}>
                <CommentInput></CommentInput>
              </Grid>
            </Grid>
            {/* bu GRİD MODAL SOL TARAF IN BİTİŞ GRİD İ*/}
            {/* write a comment
            <Grid item container xs={12} style={{ marginBottom: "8px" }}>
              <Typography>burasıda yorum input alanı</Typography>
            </Grid>
             comments 
            <Grid item container xs={12}>
              <Typography>burası yorumların sıralancağı yer</Typography>
            </Grid> */}
          </Grid>
        </div>
      </Modal>
    </div>
  );
}
