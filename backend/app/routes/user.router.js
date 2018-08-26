import Router from 'koa-router';
import { UserController} from '../controllers/user.controller';

const router = new Router({ prefix: '/user' });

router
  .get('/getInfo/:id', UserController.getInfo)
  .post('/updateProfile/:id', UserController.updateProfile);

export default router.routes();