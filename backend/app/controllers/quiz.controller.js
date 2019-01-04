import { Quiz } from '../models';

export class QuizController {
    static async addTest(ctx) {
        const quiz = Quiz.createFields.reduce(
            (acc, field) => ({
                ...acc,
                [field]: ctx.request.body[field],
            }),
            {}
        );

        ctx.body = await Quiz.create(quiz);
    }

    static async getAllQuizzes(ctx) {
        ctx.body = await Quiz.getInfoForAllQuiz();
    }

    static async getQuestions(ctx) {
        ctx.body = await Quiz.getQuestions(ctx.params.id);
    }

    static async getAnswers(ctx) {
        ctx.body = await Quiz.getAnswers(ctx.params.id);
    }

    static async removeQuiz(ctx) {
        ctx.body = await Quiz.findById(ctx.params.id).remove();
    }
}
