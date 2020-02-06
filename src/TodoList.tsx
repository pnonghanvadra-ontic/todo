import * as React from 'react';
import TodoItem from './TodoItem';
import {ChangeEvent, FormEvent} from "react";

interface TodoListProps {
}

export type Todo = {
  task: string,
  isCompleted: boolean,
}

interface TodoListState {
  todos: Array<Todo>,
  currentTodo: string,
  currentList: string
}

export default class TodoList extends React.Component<TodoListProps, TodoListState> {
  constructor(props: TodoListProps) {
    super(props);
    this.state = {
      todos: [],
      currentTodo: "",
      currentList: "all"
    }
  }

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let {todos, currentTodo} = this.state;
    localStorage.setItem("todoList", JSON.stringify([{task: currentTodo, isCompleted: false}, ...todos]));
    if (currentTodo)
      this.setState({todos: [{task: currentTodo, isCompleted: false}, ...todos], currentTodo: ""});
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({currentTodo: event.target.value})
  };

  removeTodo = (key: number) => {
    const {todos} = this.state;
    const newTodos = todos.map((todo, index) => {
      if (key === index)
        todo.isCompleted = !todo.isCompleted;
      return todo;
    });
    this.setState({todos: newTodos});
  };


  componentDidMount(){
    if(JSON.parse(localStorage.getItem("todoList") as string))
      this.setState({todos: JSON.parse(localStorage.getItem("todoList") as string)});
  }

  public render() {
    const {currentList, todos} = this.state;
    let todoList: Array<Todo> = [];

    if (currentList === "all") {
      todoList = todos;
    } else if (currentList === "left") {
      todoList = todos.filter((todo) => !todo.isCompleted)
    } else if (currentList === "completed") {
      todoList = todos.filter((todo) => todo.isCompleted)
    }

    return (
      <div>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input type="text" value={this.state.currentTodo} onChange={(e) => this.handleChange(e)}/>
          <button type={"submit"}>Add</button>
        </form>

        {todoList.map((todo, index) => <TodoItem key={index} todo={todo}
                                                 removeTodo={() => this.removeTodo(index)}/>)}
        <button onClick={() => this.setState({currentList: "all"})}>All</button>
        <button onClick={() => this.setState({currentList: "left"})}>Left</button>
        <button onClick={() => this.setState({currentList: "completed"})}>Completed</button>
      </div>
    );
  }
}

