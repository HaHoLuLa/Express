import express, { type Request, type Response } from "express"
import router from "./routes/user"
import cors, { type CorsOptions } from "cors"

const app = express()
const port: number = 8000

const corsOptions: CorsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}

app.listen(port, () => {
  console.log(`${port}번에서 서버 실행 중입니다.`)
})

app.get("/", (req: Request, res: Response) => {
  res.send({hello: "world"})
})

app.use(cors(corsOptions))
app.use("/users", router)