import { Router, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const router = Router()
const prisma = new PrismaClient()

router.post("/login", async (req: Request, res: Response) => {
  console.log(req.body)
  const { userId, userPw } = req.body
  if (userId === "" || userPw === "") {
    res.status(500).json({ message: "비어있음" })
    return
  }
  const user = await prisma.user.findFirst({
    where: {
      userId,
      userPw
    }
  })
  // const user = users.find(u => u.id === id && u.pw === pw)

  if (user) {
    req.session.user = {
      id: user.userId,
      name: user.userName
    }
    res.json({ message: "로그인 성공" })
  } else {
    res.status(401).json({ message: "로그인 실패" })
  }
})

router.post("/register", async (req: Request, res: Response) => {
  console.log(req.body)
  const { userId, userPw, userName } = req.body
  if (userId === "" || userPw === "" || userName === "") {
    res.status(500).json({ message: "비어있음" })
    return
  }
  // const already = await prisma.user.findUnique({ where: { userId } })
  // if (already) {
  //   res.status(400).json({ message: "이미있음" })
  //   return
  // }
  try {
    await prisma.user.create({
      data: {
        userId,
        userName,
        userPw
      }
    })
    res.json({ message: "회원가입 성공" })
  } catch (e: any) {
    res.status(500).json({ message: "회원가입 실패" })
  }
})

router.post("/logout", (req: Request, res: Response) => {
  console.log("로그아웃 요청")
  req.session.destroy(e => {
    if (e) {
      return res.status(500).json({ message: "로그아웃 중 오류발생" })
    }
    res.clearCookie('connect.sid'); // 기본 쿠키 이름
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