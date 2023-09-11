import { Button, Checkbox, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, TextField } from "@material-ui/core";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { Delete } from "@material-ui/icons";
import React, { useState } from "react";

/**
 * Interface for a todo item.
 */
interface Todo {
  text: string;
  completed: boolean;
}

/**
 * Styles for the TodoApp component.
 */
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  form: {
    display: "flex",
    alignItems: "flex-end",
    marginBottom: theme.spacing(2),
  },
  input: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
}));

/**
 * Calculates the number of occurrences of a word in a string.
 * @param string - The string to search for occurrences of the word.
 * @param word - The word to search for in the string.
 * @returns The number of occurrences of the word in the string.
 */
function calculateOccurrencesOfAWordsInString(string: string, word: string): number {
  // split the string into an array of words
  const words = string.split(" ");
  // create a counter variable
  let counter = 0;
  // loop through the words array
  for (const w of words) {
    // if the word matches the current word in the loop, increment the counter
    if (w === word) {
      counter++;
    }
  }
  // return the counter
  return counter;
}

/**
 * The main TodoApp component.
 */
function TodoApp(): JSX.Element {
  const classes = useStyles();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  /**
   * Handles changes to the input field.
   * @param event - The input change event.
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  /**
   * Handles adding a new todo item.
   */
  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo: Todo = {
        text: inputValue.trim(),
        completed: false,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);

      setInputValue("");
    }
  };

  /**
   * Handles toggling the completed status of a todo item.
   * @param index - The index of the todo item to toggle.
   */
  const handleToggleTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  /**
   * Handles deleting all completed todo items.
   */
  const handleDeleteCompletedTodos = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  /**
   * Handles key down events on the input field.
   * @param event - The key down event.
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={(event) => event.preventDefault()}>
        <TextField className={classes.input} label="Add a todo" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} />
        <Button variant="contained" color="primary" onClick={handleAddTodo}>
          Add
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDeleteCompletedTodos}>
          Delete completed
        </Button>
      </form>
      <List>
        {todos.map((todo, index) => (
          <ListItem key={index} dense button onClick={() => handleToggleTodo(index)}>
            <Checkbox checked={todo.completed} tabIndex={-1} disableRipple />
            <ListItemText primary={todo.text} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => setTodos(todos.filter((_, i) => i !== index))}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <div>Occurents of copilot: {calculateOccurrencesOfAWordsInString(todos.map((todo) => todo.text).join(";"), "copilot")}</div>
    </div>
  );
}

export default TodoApp;
