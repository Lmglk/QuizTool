import Router from 'koa-router';
import { QuizController } from '../controllers/quiz.controller';

const router = new Router({ prefix: '/quiz' });

router
    .post('/addTest', QuizController.addTest)
    .get('/getAll', QuizController.getAllQuizzes)
    .get('/getQuestionsByTestId/:id', QuizController.getQuestions)
    .get('/getAnswersByTestId/:id', QuizController.getAnswers)
    .get('/removeQuiz/:id', QuizController.removeQuiz);

export default router.routes();
