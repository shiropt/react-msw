import { useEffect, useState } from "react";
import "./App.css";
import { Todo } from "./mocks/data/todos";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState<(Todo & { editMode?: boolean })[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [editTodoTitle, setEditTodoTitle] = useState("");

  useEffect(() => {
    console.log("useEffect");

    fetch("/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const handleAddTodo = async () => {
    const newTodo: Todo = {
      id: todos.length + 1,
      title: newTodoTitle,
      isDone: false,
    };
    const { data } = await axios.post<Todo>("/todos", newTodo);
    setTodos([...todos, data]);
    setNewTodoTitle("");
  };

  const handleDeleteTodo = async (id: number) => {
    const { data } = await axios.delete(`/todos/${id}`);
    const updatedTodos = todos.filter((todo) => todo.id !== data.id);
    setTodos(updatedTodos);
  };

  const handleToggleTodo = async (todo: Todo) => {
    const { data } = await axios.put(`/todos/${todo.id}`, { ...todo, isDone: !todo.isDone });
    const updatedTodos = todos.map((todo) => (todo.id === data.id ? { ...data } : todo));
    setTodos(updatedTodos);
  };

  const updateTodo = async (id: number, title: string) => {
    const { data } = await axios.put(`/todos/${id}`, { title });
    const updatedTodos = todos.map((todo) => (todo.id === id ? data : todo));
    setTodos(updatedTodos);
    setNewTodoTitle("");
  };
  const editTodo = async (editTodo: Todo) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === editTodo.id) {
          return { ...todo, editMode: true };
        }
        return todo;
      })
    );

    setEditTodoTitle(editTodo.title);
  };
  const cancelEditTodo = (editTodo: Todo) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === editTodo.id) {
          return { ...todo, editMode: false };
        }
        return todo;
      })
    );
  };

  return (
    <div className="App">
      <h1>Todoリスト</h1>
      <div className="todo-form">
        <input
          type="text"
          placeholder="タスクを入力してください"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <button disabled={newTodoTitle.length === 0} onClick={handleAddTodo}>
          追加
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li className="todo-item" key={todo.id}>
            <input
              className="todo-checkbox"
              type="checkbox"
              checked={todo.isDone}
              onChange={() => handleToggleTodo(todo)}
            />
            {todo.editMode ? (
              <input
                className="todo-title"
                type="text"
                value={editTodoTitle}
                onChange={(e) => setEditTodoTitle(e.target.value)}
              />
            ) : (
              <span onClick={() => editTodo(todo)} className={`todo-title ${todo.isDone ? "done" : ""}`}>
                {todo.title}
              </span>
            )}
            {todo.editMode ? (
              <div className="button-wrapper">
                <button className="edit-button" onClick={() => updateTodo(todo.id, editTodoTitle)}>
                  更新
                </button>
                <button className="edit-button" onClick={() => cancelEditTodo(todo)}>
                  キャンセル
                </button>
              </div>
            ) : (
              <div className="button-wrapper">
                <button className="delete-button" onClick={() => handleDeleteTodo(todo.id)}>
                  削除
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
