import express, { Request, Response } from "express";

import Todo from "../model/Todo";
import db from "../singleton/sqlite3";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  let todos: Todo[] = [];
  db.all("SELECT id, title FROM todos", function(err, rows) {
    if (err) console.error(err);
    rows.forEach(row => todos.push(new Todo(row.id, row.title)));

    res.status(200).json(todos);
  });

  db.close();
});

router.post("/", (req: Request, res: Response) => {
  db.run("INSERT INTO todos (title) VALUES (?)", [req.body.title]);
  db.close();

  res.status(200).send("ok");
});

export default router;
