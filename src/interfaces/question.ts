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

interface QuestionAnswered extends QuestionUnanswered {
  answeredAt: string;
  answeredBy: string;
  answer: string;
}

interface QuestionUpdate {
  answer: string;
  id: string;
  token: string;
}

interface QuestionUnansweredWithId extends Omit<QuestionInput, 'tags'> {
  id: number;
}

export {
  QuestionInput,
  QuestionDB,
  QuestionUnanswered,
  QuestionAnswered,
  QuestionUpdate,
  QuestionUnansweredWithId,
};
