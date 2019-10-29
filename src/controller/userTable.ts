// TODO https://qiita.com/tashxii/items/7c86f39fced68ea9903d

import { DBCommon } from "../singleton/userTable";

const userTableName = "user";

class UserTable {
  static async createTableIfNotExists(): Promise<void> {
    const db = DBCommon.get();
    const query = `CREATE TABLE IF NOT EXISTS ${userTableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT )`;
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
    const users: User[] = [];
    const query = `SELECT * FROM ${userTableName}`;
    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) return reject(err);
        rows.forEach(row =>
          users.push(new User(row["id"], row["name"], row["email"]))
        );
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
        if (row === null) return resolve(null);
        return resolve(new User(row["id"], row["name"], row["email"]));
      });
    });
  }

  static async deleteUser(id: number): Promise<void> {
    const db = DBCommon.get();
    const query = `DELETE FROM ${userTableName} WHERE id = $id`;
    return new Promise((resolve, reject) => {
      try {
        db.get(query, id);
        return resolve();
      } catch (err) {
        return reject(err);
      }
    });
  }
}
