import { Router } from "express";
import { 
    registerUser,
    loginUser,
    home, 
    deleteUser
} from "../controllers/auth-controller";


const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/home/:user", home);
router.get("/delete", deleteUser);

export default router;