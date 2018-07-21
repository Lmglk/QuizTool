import mongoose, { Schema } from 'mongoose';

const QuizSchema = new Schema({
  title: {
    type: String,
    required: 'Title is required'
  },
  author_id: {
    type: String,
    required: 'AuthorID is required'
  },
  description: {
    type: String,
  },
  questions: [
    {
      id: {
        type: Number,
        required: 'Id is required'
      },
      title: {
        type: String,
        required: 'Title in questions is required',
      },
      options: {
        type: [String],
        required: 'Options in questions is required',
        validate: {
          validator: options => options.length > 1,
          message: 'Count of options should be more than two'
        }
      },
      answers: {
        type: [String],
        required: 'Answers in questions is required',
        validate: {
          validator: answers => answers.length > 0,
          message: 'Count of answers should be more than zero'
        }
      }
    },
  ]
}, {
  timestamps: true,
});

QuizSchema.statics.createFields = ['title', 'author_id', 'description', 'questions'];

QuizSchema.statics.getInfoForAllQuiz = function() {
  return this.find(null, {questions: 0, createdAt: 0, updatedAt: 0, __v: 0});
};

QuizSchema.statics.getQuestions = function(id) {
  return this.findById(id, {
    '_id': 0,
    'questions.id': 1,
    'questions.title': 1,
    'questions.options': 1
  });
};

QuizSchema.statics.getAnswers = function(id) {
  return this.findById(id, {
    '_id': 0,
    'questions.id': 1,
    'questions.answers': 1
  });
};

export default mongoose.model('quiz', QuizSchema);
