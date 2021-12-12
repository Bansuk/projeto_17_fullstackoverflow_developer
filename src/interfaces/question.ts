interface QuestionInput {
  question: string;
  student: string;
  class: string;
  tags: string;
}

interface QuestionDB extends Omit<QuestionInput, 'tags'> {
  tags: string[];
}

export { QuestionInput, QuestionDB };
