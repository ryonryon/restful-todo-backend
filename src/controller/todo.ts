import express, { Request, Response } from "express";
import TodoTable, { DBCommon } from "../singleton/todoTable";

const router = express.Router();

router.get("/all", async (req: Request, res: Response) => {
  DBCommon.init();
  res.status(200).send(await TodoTable.getTodos());
});

router.post("/done", async (req: Request, res: Response) => {
  const todoId = req.body["todo_id"];
  DBCommon.init();
  try {
    await TodoTable.doneTodo(todoId);
    res.status(200).send("Todo's status is successfully changed.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Todo couldn't be done");
  }
});

router.post("/new", async (req: Request, res: Response) => {
  const userId = req.body["user_id"];
  const title = req.body["title"];

  DBCommon.init();
  await TodoTable.createTableIfNotExists();

  // 存在確認

  try {
    await TodoTable.createTodo(userId, title);
    res.status(200).send("Todo is successfully added.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Todo couldn't be added");
  }
});

router.delete("/", async (req: Request, res: Response) => {
  const todoId = req.body["todo_id"];

  try {
    await TodoTable.deleteTodo(todoId);

    res.status(200).send("Todo is successfully deleted.");
  } catch (err) {
    console.error(err);
    res.status(401).send("The id isn't valid id.");
  }
});

export default router;
