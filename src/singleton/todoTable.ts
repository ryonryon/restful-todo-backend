// TODO https://qiita.com/tashxii/items/7c86f39fced68ea9903d
import sqlite3 from "sqlite3";
import Todo from "../model/Todo";

let database: sqlite3.Database;
const todoTableName = "todo";

export class DBCommon {
  static init() {
    database = new sqlite3.Database("todo.sqlite3");
  }

  static get() {
    return database;
  }
}

class TodoTable {
  static async createTableIfNotExists(): Promise<void> {
    const db = DBCommon.get();
    const query = `CREATE TABLE IF NOT EXISTS ${todoTableName} (todo_id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, title TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP )`;
    return new Promise((resolve, reject) => {
      try {
        db.serialize(() => db.run(query));
        return resolve();
      } catch (err) {
        return reject(err);
      }
    });
  }

  static async getTodos(): Promise<Todo[]> {
    const db = DBCommon.get();
    const query = `SELECT * FROM ${todoTableName}`;
    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) return reject(err);
        const todos: Todo[] = [];
        rows.forEach(row =>
          todos.push(
            new Todo(
              row["todo_id"],
              row["user_id"],
              row["title"],
              row["createdAt"]
            )
          )
        );
        return resolve(todos);
      });
    });
  }

  static async getTodo(todoId: number): Promise<Todo | null> {
    const db = DBCommon.get();
    const query = `SELECT * FROM ${todoTableName} WHERE todo_id = $todo_id`;
    return new Promise((resolve, reject) => {
      db.get(query, [todoId], (err, row) => {
        if (err) return reject(err);
        if (row === undefined) return resolve(null);
        return resolve(
          new Todo(todoId, row["user_id"], row["title"], row["created_at"])
        );
      });
    });
  }

  static async createTodo(userId: number, title: string): Promise<void> {
    const db = DBCommon.get();
    const query = `INSERT OR REPLACE INTO ${todoTableName} (user_id, title) VALUES ($user_id, $title)`;
    return new Promise((resolve, reject) => {
      try {
        db.get(query, [userId, title]);
        return resolve();
      } catch (err) {
        return reject(err);
      }
    });
  }

  static async deleteTodo(todoId: number): Promise<void> {
    const db = DBCommon.get();
    const query = `DELETE FROM ${todoTableName} WHERE todo_id = $todo_id`;
    return new Promise((resolve, reject) => {
      try {
        db.get(query, [todoId]);
        return resolve();
      } catch (err) {
        return reject(err);
      }
    });
  }
}

export default TodoTable;
