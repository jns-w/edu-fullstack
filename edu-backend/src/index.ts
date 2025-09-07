import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import courseRoutes from "./routes/course.routes";
import lessonRoutes  from "./routes/lesson.routes";
import dictionaryServices from "./services/dictionary.services";
import {connectDB} from "./config/db";

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 8080

connectDB().then()

app.use(express.json())

app.router.get("/ping", async (req, res) => {
    console.log("Ping")
    return res.json("Pong")
})

app.use("/auth", authRoutes)
app.use("/user", userRoutes)
app.use("/course", courseRoutes)
app.use("/lesson", lessonRoutes)
app.use("/dictionary", dictionaryServices)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})