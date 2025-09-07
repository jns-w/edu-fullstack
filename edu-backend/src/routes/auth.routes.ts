import {Router} from "express";
import {db} from "../config/db";
import {users} from "../config/schema";
import bcrypt from "bcrypt"
import {eq} from "drizzle-orm";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const router = Router();

router.post("/signup", async (req, res) => {
    try {
        const {email, name, password} = req.body;
        const hash = bcrypt.hashSync(password, 10)
        const registrationData = {
            email,
            name,
            password: hash
        }
        // hash password
        const [user] = await db.insert(users).values(registrationData).returning({
            email: users.email, name: users.name, userId: users.userId
        });

        const token = jwt.sign({
            id: user.userId,
            email: user.email,
        }, process.env.JWT_SECRET as string)

        const responseData = {
            accessToken: token,
            user: {
                userId: user.userId,
                email: user.email
            }
        }

        res.status(200).json({ok: true, data: responseData})
    } catch (error) {
        console.log(error)
        res.status(500).json("Failed")
    }
})

router.post("/signin", async (req, res) => {
    try {
        const {email, password} = await req.body;
        // check for user
        const queryResult = await db.query.users.findMany({
            where: eq(users.email, email),
            columns: {
                userId: true,
                name: true,
                email: true,
                password: true,
            }
        });

        const user = queryResult[0];
        const validPassword = bcrypt.compareSync(password, user.password)

        if (!validPassword) {
            return res.status(401).json({message: "Invalid password"})
        }

        const token =  jwt.sign({
            id: user.userId,
            email: user.email,
        }, process.env.JWT_SECRET as string)

        const responseData = {
            accessToken: token,
            user: {
                userId: user.userId,
                email: user.email,
                name: user.name,
            }
        }

        res.status(200).json({ok: true, data: responseData})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Request failed"})
    }
})

router.post("/verifyToken", async (req, res) => {
    try {
        const { token } = req.body;
        const validToken = jwt.verify(token, process.env.JWT_SECRET as string);

        console.log(validToken)

        if (!validToken) {
            return res.status(401).json({ok: false, message: "Invalid token"})
        }

        res.status(200).json({ok: true, data: validToken})
    } catch (error) {
        res.status(500).json({error: "Request failed"})
    }
})

export default router;