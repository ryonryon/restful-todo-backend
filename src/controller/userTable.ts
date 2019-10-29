import { DBCommon } from "../singleton/userTable";

const userTableName = "user";

class UserTable {
  static async createTableIfNotExists() {
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
}
