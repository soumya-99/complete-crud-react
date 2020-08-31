import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  //? when the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // console.log(snapshot.docs.map(doc => doc.data())); //array of objects in database
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (event) => {
    //~ this will fire off when we clicked the button
    event.preventDefault(); // ^ will stop the refresh

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // console.log("Yoooo Sheeeeettt");
    // setTodos([...todos, input]);
    setInput(""); // & clear up the input field after submitting
  };

  return (
    <div className="App">
      <h1>Full CRUD App By Soumyadeep...🎊</h1>
      <form>
        <FormControl>
          {/* <InputLabel>Todo List</InputLabel> */}
          {/* <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          /> */}
          <TextField
            value={input}
            onChange={(event) => setInput(event.target.value)}
            id="outlined-secondary"
            label="INPUT TODOOO"
            variant="outlined"
          />
          <FormHelperText id="my-helper-text">
            Add what you want.
          </FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          disabled={!input}
          onClick={addTodo}
        >
          Add Task
        </Button>
      </form>

      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
