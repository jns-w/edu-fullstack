import { Router } from "express";
import { db } from "../config/db";

const router = Router();

router.get("/details", async (req, res) => {
    console.log("User Details")
    res.send("User details")
})

export default router;