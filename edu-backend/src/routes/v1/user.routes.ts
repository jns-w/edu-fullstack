import {Router} from "express";
import {authMiddleware, AuthRequest} from "../../middleware/auth";

const router = Router();

// NOTE: auth middleware applies to all routes in this file, auth token is verified and user data is embedded in req
router.use(authMiddleware);

router.get("/details", async (req: AuthRequest, res) => {
    console.log("User", req.user)
    res.send("User details")
})

router.get("/course-progress/:courseId", async (req: AuthRequest, res) => {
    const courseId = parseInt(req.params.courseId);
    console.log("Course", courseId)
    console.log("user", req.user)
})

router.get("/lesson/:lessonId/complete", async (req: AuthRequest, res) => {
    const lessonId = parseInt(req.params.lessonId);
})

export default router;