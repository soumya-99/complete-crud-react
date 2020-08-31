import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import "./Todo.css";
import {
  Button,
  Modal,
  Input,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import db from "./firebase";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    textAlign: "center",
    width: "100%",
    height: "50vh",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  //   const handleOpen = () => {
  //     setOpen(true);
  //   };

  const updateTodo = () => {
    //! update the todo with the new input text
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );

    setOpen(false);
    setInput("");
  };
  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h1>Edit Your Todo</h1>
          <FormControl>
            <InputLabel>Update...</InputLabel>
            <Input
              placeholder={props.todo.todo}
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button onClick={updateTodo}>✅UPDATE</Button>
          </FormControl>
        </div>
      </Modal>

      <List className="todo__list">
        <ListItem>
          <ListItemText
            primary={props.todo.todo}
            secondary="__todos by Soumyadeep"
          />
        </ListItem>
        <Button onClick={(e) => setOpen(true)}>🟡EDIT</Button>
        <Button
          onClick={(event) =>
            db.collection("todos").doc(props.todo.id).delete()
          }
        >
          ❌DELETE
        </Button>
        {/* <li>{props.text}</li> */}
      </List>
    </>
  );
}

export default Todo;
