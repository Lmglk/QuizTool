import Router from 'koa-router';
import auth from './auth.router';
import quiz from './quiz.router';
import user from './user.router';

const router = new Router({ prefix: '/api' });

router.use(auth);
router.use(quiz);
router.use(user);

export default router.routes();
