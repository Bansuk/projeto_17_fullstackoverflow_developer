interface QuestionInput {
  question: string;
  student: string;
  class: string;
  tags: string;
}

interface QuestionDB extends Omit<QuestionInput, 'tags'> {
  tags: string[];
}

interface QuestionUnanswered extends QuestionInput {
  answered: boolean;
  submitedAt: string;
}

interface QuestionUpdate {
  answer: string;
  id: string;
  token: string;
}

export { QuestionInput, QuestionDB, QuestionUnanswered, QuestionUpdate };
