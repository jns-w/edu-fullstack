import {Router} from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import courseRoutes from "./course.routes";
import lessonRoutes from "./lesson.routes";
import dictionaryServices from "../../services/dictionary.services";

const v1Router = Router();

v1Router.use("/auth", authRoutes)
v1Router.use("/user", userRoutes)
v1Router.use("/course", courseRoutes)
v1Router.use("/lesson", lessonRoutes)
v1Router.use("/dictionary", dictionaryServices)

export default v1Router;