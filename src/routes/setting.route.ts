import { Router } from "express";
import { AuthorityEnum } from "../constants";
import { settingController } from "../controllers";
import { isLogged, requireAllOf, requireAnyOf, requireOne } from "../middlewares";

const router = Router();

router.get('/', isLogged, requireAnyOf(AuthorityEnum.SETTING_LIST, AuthorityEnum.SETTING_READ, AuthorityEnum.SETTING_WRITE, AuthorityEnum.SETTING_DELETE), settingController.findByKey);
router.put('/', isLogged, requireAllOf(AuthorityEnum.SETTING_WRITE), settingController.updateByKey);
router.get('/list', isLogged, requireOne(AuthorityEnum.SETTING_LIST), settingController.list);

export default router;