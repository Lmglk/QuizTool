import Router from 'koa-router';
import auth from './auth.router';
import quiz from './quiz.router';

const router = new Router({ prefix: '/api' });

router.use(auth);
router.use(quiz);

export default router.routes();
