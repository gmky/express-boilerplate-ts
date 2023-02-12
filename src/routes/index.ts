import { NextFunction, Request, Response, Router } from 'express';
import { NotFoundError } from '../errors';

const router = Router();

router.use((_req: Request, _res: Response, next: NextFunction) => {
  throw new NotFoundError('Path not found');
})

export default router;