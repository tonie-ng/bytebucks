import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Errback, NextFunction, Request, Response } from "express";
import http from "http";
import { register, login } from "./routes";
import { err_response } from "./utils";
const app = express();

require("./database/database").connect();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(express.json());
app.use(cookieParser());

app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  // Check if it's a JSON parsing error
  if (
    err instanceof SyntaxError &&
    (err as any).status === 400 &&
    "body" in err
  ) {
    return err_response(
      res,
      400,
      false,
      "Invalid Json",
      "Invalid format in one of the fields"
    );
  }
  next(err);
});

app.use("/register", register);
app.use("/login", login)

const server = http.createServer(app);
const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
