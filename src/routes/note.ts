import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";

const noteRouter = Router()
const prisma = new PrismaClient()

noteRouter.get("/", async (req: Request, res: Response) => {
  const writer = req.query.writer as string | undefined
  try {
    const notes = await prisma.note.findMany({
      where: {
        writer
      }
    })
    res.json(notes)
  } catch (e: any) {
    console.log(e)
    res.status(500).json({ error: "failed" })
  }
})

noteRouter.get("/:writer", async (req: Request, res: Response) => {
  const writer = req.params.writer as string
  const id = req.query.id as string
  try {
    const notes = await prisma.note.findUnique({
      where: {
        writer,
        id
      }
    })
    res.json(notes)
  } catch (e: any) {
    console.log(e)
    res.status(500).json({ error: "failed" })
  }
})

noteRouter.post("/write", async (req: Request, res: Response) => {
  const { id, title, content, writer } = req.body
  let data
  try {
    if (id) {
      data = await prisma.note.update({
        where: {
          id
        },
        data: {
          title,
          content
        }
      })
    } else {
      data = await prisma.note.create({
        data: {
          content,
          title,
          writer,
          num: Math.random(),
          regtime: new Date().toISOString(),
        }
      })
    }
    console.log(data)
    res.json({ message: "성공" })
  } catch (e: any) {
    console.log(e)
    res.status(500).json({ error: "failed" })
  }
})

noteRouter.post("/delete/:id", async (req: Request, res: Response) => {
  const id = req.params.id as string
  try {
    await prisma.note.delete({
      where: {
        id
      }
    })
    console.log("성공")
    res.json({ message: "성공" })
  } catch (e) {
    console.log(e)
    res.status(500).json({ e })
  }
})

export default noteRouter