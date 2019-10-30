class Todo {
  todoId: number;
  userId: number;
  title: string;
  isDone: boolean;
  createdAt: Date;

  constructor(
    todoId: number = NaN,
    userId: number = NaN,
    title: string,
    isDone: boolean,
    createdAt: Date
  ) {
    this.todoId = todoId;
    this.userId = userId;
    this.title = title;
    this.isDone = isDone;
    this.createdAt = createdAt;
  }
}

export default Todo;
