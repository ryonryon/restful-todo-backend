// TODO https://qiita.com/tashxii/items/7c86f39fced68ea9903d
import sqlite3 from "sqlite3";
import User from "../model/User";

let database: sqlite3.Database;
const userTableName = "user";

export class DBCommon {
  static init() {
    database = new sqlite3.Database("user.sqlite3");
  }

  static get() {
    return database;
  }
}

class UserTable {
  static async createTableIfNotExists(): Promise<void> {
    const db = DBCommon.get();
    const query = `CREATE TABLE IF NOT EXISTS ${userTableName} (user_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT )`;
    return new Promise((resolve, reject) => {
      try {
        db.serialize(() => db.run(query));
        return resolve();
      } catch (err) {
        return reject(err);
      }
    });
  }

  static async count(): Promise<number> {
    const db = DBCommon.get();
    const query = `SELECT (*) FROM ${userTableName}`;
    return new Promise((resolve, reject) => {
      db.get(query, (err, row) => {
        if (err) return reject(err);
        return resolve(row["count(*)"]);
      });
    });
  }

  static async createUser(name: string, email: string): Promise<void> {
    const db = DBCommon.get();
    const query = `INSERT OR REPLACE INTO ${userTableName} (name, email) VALUES ($name, $email)`;
    return new Promise((resolve, reject) => {
      try {
        db.get(query, [name, email]);
        return resolve();
      } catch (err) {
        return reject(err);
      }
    });
  }

  static async getUsers(): Promise<User[]> {
    const db = DBCommon.get();
    const query = `SELECT * FROM ${userTableName}`;
    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) return reject(err);
        const users: User[] = [];
        rows.forEach(row => {
          users.push(new User(row["user_id"], row["name"], row["email"]));
        });

        return resolve(users);
      });
    });
  }

  static async getUser(name: string, email: string): Promise<User | null> {
    const db = DBCommon.get();
    const query = `SELECT * FROM ${userTableName} WHERE name = $name AND email = $email`;
    return new Promise((resolve, reject) => {
      db.get(query, [name, email], (err, row) => {
        if (err) return reject(err);
        if (row === undefined) return resolve(null);
        return resolve(new User(row["user_id"], row["name"], row["email"]));
      });
    });
  }

  static async deleteUser(userId: number): Promise<void> {
    const db = DBCommon.get();
    const query = `DELETE FROM ${userTableName} WHERE user_id = $user_id`;
    return new Promise((resolve, reject) => {
      try {
        db.get(query, [userId]);
        return resolve();
      } catch (err) {
        return reject(err);
      }
    });
  }
}

export default UserTable;
