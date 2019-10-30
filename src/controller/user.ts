import express, { Request, Response } from "express";

import UserTable, { DBCommon } from "../singleton/userTable";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const name = req.body["name"];
  const email = req.body["email"];

  // 正しい名前とメールの検証

  DBCommon.init();
  const userData = await UserTable.getUser(name, email);
  if (!userData) res.status(401).send("user can't find.");

  res.status(200).send(userData);
});

router.post("/new", async (req: Request, res: Response) => {
  const name = req.body["name"];
  const email = req.body["email"];

  // 正しい名前とメールの検証
  DBCommon.init();
  await UserTable.createTableIfNotExists();

  // userが他にいないことの確認

  try {
    await UserTable.createUser(name, email);

    res.send(200).send("User is successfully added.");
  } catch (err) {
    console.error(err);
  }
});

router.get("/all", async (req: Request, res: Response) => {
  DBCommon.init();
  const users = await UserTable.getUsers();

  res.status(200).send(users);
});

router.delete("/", async (req: Request, res: Response) => {
  const id: number = req.body["id"];

  DBCommon.init();

  try {
    await UserTable.deleteUser(id);

    res.status(200).send("User is successfully deleted.");
  } catch (err) {
    console.error(err);
  }
});

export default router;
