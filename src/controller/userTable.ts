// TODO https://qiita.com/tashxii/items/7c86f39fced68ea9903d

import { DBCommon } from "../singleton/userTable";

const userTableName = "user";

class UserTable {
  static async createTableIfNotExists(): Promise<void> {
    const db = DBCommon.get();
    return new Promise((resolve, reject) => {
      try {
        db.serialize(() => {
          db.run(`CREATE TABLE IF NOT EXISTS ${userTableName} (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    email TEXT
                  )`);
        });
        return resolve();
      } catch (err) {
        return reject(err);
      }
    });
  }

  static async count(): Promise<number> {
    const db = DBCommon.get();
    return new Promise((resolve, reject) => {
      db.get(`SELECT (*) FROM ${userTableName}`, (err, row) => {
        if (err) return reject(err);
        return resolve(row["count(*)"]);
      });
    });
  }

  static async createUser(name: string, email: string): Promise<void> {
    const db = DBCommon.get();
    return new Promise((resolve, reject) => {
      try {
        db.get(
          `INSERT OR REPLACE INTO ${userTableName}
          (name, email) VALUES ($name, $email)`,
          name,
          email
        );
        return resolve();
      } catch (err) {
        return reject(err);
      }
    });
  }

  static async getUsers(): Promise<User[]> {
    const db = DBCommon.get();
    const users: User[] = [];
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM ${userTableName}`, (err, rows) => {
        if (err) return reject(err);
        rows.forEach(row =>
          users.push(new User(row["id"], row["name"], row["email"]))
        );
        return resolve(users);
      });
    });
  }
}
