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

  if (await UserTable.getUser(name, email))
    res.status(401).send("The user name and email is already exists.");

  try {
    await UserTable.createUser(name, email);

    res.status(200).send("User is successfully added.");
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
    res.status(401).send("The id isn't valid id.");
  }
});

export default router;
