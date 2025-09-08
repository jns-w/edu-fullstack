import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectDB} from "./config/db";
import v1Router from "./routes/v1";

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

app.use("/api/v1", v1Router)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})