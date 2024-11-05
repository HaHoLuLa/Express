import { PrismaClient } from "@prisma/client"
import { Request, Response, Router } from "express"

const boardRouter = Router()
const prisma = new PrismaClient()

boardRouter.get("/", async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string)
  const listSize = 20
  const start = page !== 0 && (page - 1) * listSize || 0
  try {
    const boards = await prisma.board.findMany({
      select: {
        num: true,
        title: true,
        id: true,
        writer: true,
        regtime: true,
        hits: true,
        type: true,
      },
      orderBy: { num: "desc" },
      skip: start,
      take: listSize
    })
    res.json(boards)
  } catch (e: any) {
    console.log(e)
    res.status(500).json({ error: "failed" })
  }
})

boardRouter.post("/write", async (req: Request, res: Response) => {
  console.log(req.body)
  const { title, content, id, writer } = req.body
  try {
    await prisma.board.create({
      data: {
        id,
        content,
        title,
        writer,
        hits: 0,
        regtime: new Date().toISOString(),
      }
    })
    console.log("success")
    res.json({ success: true })
  } catch (e: any) {
    console.log(e)
    res.status(500).json({ error: "failed" })
  }
})

export default boardRouter