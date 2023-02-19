import { Router } from "express";
import { AuthorityEnum } from "../constants";
import { authController } from "../controllers";
import { validateBody } from "../middlewares";
import { isLogged, requireAllOf, requireOne } from "../middlewares/auth.mid";
import { LoginSchema } from "../dto";

const router = Router();

router.post('/refresh', authController.refreshToken);
router.post('/login', validateBody(LoginSchema), authController.login);
router.get('/profile', isLogged, requireOne(AuthorityEnum.AUTH_PROFILE), authController.profile);
router.post('/revoke', isLogged, requireOne(AuthorityEnum.AUTH_REVOKE), authController.revokeToken);

export default router;