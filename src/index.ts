import express from "express";

import user from "./controller/user";
import todo from "./controller/todo";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", user);
app.use("/todo", todo);

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
