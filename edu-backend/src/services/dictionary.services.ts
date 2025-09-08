import {Router} from "express";
import {db} from "../config/db";
import axios from "axios";

const router = Router();

router.get("/:word", async (req, res) => {
    const word = req.params.word;

    try {
        const response = await axios.get(`https://freedictionaryapi.com/api/v1/entries/en/${word}`);

        res.json({
            source: "api",
            data: response.data
        })
    } catch (error) {
        res.status(500).json({error: "Request failed"})
    }
})

export default router;