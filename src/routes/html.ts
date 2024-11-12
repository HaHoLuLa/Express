import { Request, Response, Router } from "express";
import path from "path";

const htmlRouter = Router();

htmlRouter.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../views", "index.html"))
})

export default htmlRouter