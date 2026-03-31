import { Router } from "express";
import { loginUser, logutUser, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
// Verify JWT middleware will check if the user is authenticated before allowing them to logout
router.route('/logout').post(verifyJWT, logutUser);

export default router;