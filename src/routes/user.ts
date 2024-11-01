import { Router, Request, Response } from "express"

const router = Router()

router.get("/", (req: Request, res: Response) => {
  res.json({ users: ["me", "you"] })
})

export default router