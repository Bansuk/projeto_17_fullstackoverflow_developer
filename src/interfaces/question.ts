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

interface QuestionFull extends QuestionInput {
  id: number;
  answered: boolean;
  submitedAt: string;
  answeredAt: string;
  answeredBy: string;
  answer: string;
}

interface QuestionUn extends Omit<QuestionInput, 'tags'> {
  id: number;
  submitedAt: string;
}

export {
  QuestionInput,
  QuestionDB,
  QuestionUnanswered,
  QuestionUpdate,
  QuestionFull,
  QuestionUn,
};
