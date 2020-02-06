import * as React from 'react';
import {Todo} from "./TodoList";

interface TodoItemProps {
  todo: Todo
  removeTodo: () => void
}

export default (props: TodoItemProps) => {
  const {todo, removeTodo} = props;
  return (
    <li style={{textDecoration: todo.isCompleted ? "line-through" : ""}} onClick={removeTodo}>{todo.task}</li>
  );
}
