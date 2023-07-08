import { db } from "./db";
import { todos } from "./data/todos";

todos.forEach((todo) => {
  db.todo.create({ id: todo.id, title: todo.title, isDone: todo.isDone });
});

export const handlers = [...db.todo.toHandlers("rest")];
