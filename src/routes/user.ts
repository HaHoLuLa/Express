import { Router, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const router = Router()
const prisma = new PrismaClient()

router.get("/", async (req: Request, res: Response) => {
  const users = await prisma.member.findMany()
  res.json(users)
})

export default router