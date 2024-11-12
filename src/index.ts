

import express, { type Request, type Response, json, static as exStatic } from "express"
import router from "./routes/user"
import cors, { type CorsOptions } from "cors"
import session from "express-session"
import dotenv from "dotenv"
import boardRouter from "./routes/board"
import htmlRouter from "./routes/html"
import path from "path"

dotenv.config()

const app = express()
const port: number = 8000
const sessionSecret = process.env.SESSION_SECRET || ""
const corsOptions: CorsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}

app.use(json())
app.use(cors(corsOptions))
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}))
app.use(exStatic(path.join(__dirname, "views")))

app.listen(port, () => {
  console.log(`${port}번 포트에서 서버 실행 중입니다.`)
})

app.get("/", (req: Request, res: Response) => {
  res.send({ hello: "world" })
})

app.use("/user", router)
app.use("/board", boardRouter)
app.use("/html", htmlRouter)