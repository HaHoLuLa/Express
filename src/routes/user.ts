import { Router, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const router = Router()
const prisma = new PrismaClient()

router.post("/login", async (req: Request, res: Response) => {
  console.log(req.body)
  const { id, pw } = req.body
  const user = await prisma.member.findUnique({
    where: {
      id,
      pw
    }
  })
  // const user = users.find(u => u.id === id && u.pw === pw)

  if (user) {
    req.session.user = {
      id: user.id,
      name: user.name
    }
    res.json({ message: "로그인 성공" })
  } else {
    res.status(401).json({ message: "로그인 실패" })
  }
})

router.post("/logout", (req: Request, res: Response) => {
  req.session.destroy(e => {
    if (e) {
      return res.status(500).json({ message: "로그아웃 중 오류발생" })
    }
    res.json({ message: "로그아웃 성공" })
  })
})

router.get("/profile", (req: Request, res: Response) => {
  if (req.session.user) {
    res.json({ user: req.session.user })
  } else {
    res.status(401).json({ message: "로그인 필요" })
  }
})

export default router