import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";

const noteRouter = Router()
const prisma = new PrismaClient()

noteRouter.get("/", async (req: Request, res: Response) => {
  try {
    const notes = await prisma.note.findMany()
    res.json(notes)
  } catch (e: any) {
    console.log(e)
    res.status(500).json({ error: "failed" })
  }
})

noteRouter.get("/one", async (req: Request, res: Response) => {
  try {
    const notes = await prisma.note.findFirst()
    res.json(notes)
  } catch (e: any) {
    console.log(e)
    res.status(500).json({ error: "failed" })
  }
})

noteRouter.post("/write", async (req: Request, res: Response) => {
  const { title, content, writer } = req.body
  try {
    const data = await prisma.note.create({
      data: {
        content,
        title,
        writer,
        hits: 0,
        num: Math.random(),
        regtime: new Date().toISOString(),
      }
    })
    console.log(data)
    res.json({ message: "성공" })
  } catch (e: any) {
    console.log(e)
    res.status(500).json({ error: "failed" })
  }
})

export default noteRouter