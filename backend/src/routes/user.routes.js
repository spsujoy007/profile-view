import { Router } from "express";
import { changePassword, loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
// Verify JWT middleware will check if the user is authenticated before allowing them to logout
router.route('/logout').post(verifyJWT, logoutUser);
router.route('/refreshAccessToken').post(refreshAccessToken);

// change password
router.route('/change-password').post(verifyJWT, changePassword);

export default router;