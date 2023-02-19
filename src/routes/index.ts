import { NextFunction, Request, Response, Router } from 'express';
import { NotFoundError } from '../errors';
import authRoutes from './auth.route';
import settingRoutes from './setting.route';

const router = Router();

router.use('/api/auth', authRoutes);
router.use('/api/settings', settingRoutes);

router.use((_req: Request, _res: Response, _next: NextFunction) => {
  throw new NotFoundError('Path not found');
})

export default router;