import connection from '../database/database';
import * as helper from '../helpers/questionRepositoryHelper';
import {
  QuestionDB,
  QuestionUnanswered,
  QuestionUpdate,
  QuestionUnansweredWithId,
  QuestionAnswered,
} from '../interfaces/question';
import { UserInput } from '../interfaces/user';

const findQuestionByText = async (question: string) => {
  const result = await connection.query(
    'SELECT * FROM question WHERE question = $1',
    [question],
  );

  return result.rowCount;
};

const insertQuestion = async ({
  question,
  student,
  class: className,
  tags,
}: QuestionDB) => {
  await helper.insertClass(className);
  await helper.insertStudent(student, className);
  await Promise.all(
    tags.map(async (tag) => {
      await helper.insertTag(tag);
    }),
  );
  const result = await connection.query(
    'INSERT INTO question (question, author_id) VALUES ($1, (SELECT id FROM student WHERE name = $2)) RETURNING *;',
    [question, student],
  );
  await Promise.all(
    tags.map(async (tag) => {
      await helper.insertQuestionTag(question, tag);
    }),
  );

  return result.rows[0].id;
};

const findUserByName = async (name: string) => {
  const result = await connection.query(
    'SELECT * FROM student WHERE name = $1',
    [name],
  );

  return result.rowCount;
};

const insertUser = async ({ name, class: className, token }: UserInput) => {
  await helper.insertClass(className);
  await helper.insertStudent(name, className, token);
};

const findQuestionById = async (id: string): Promise<QuestionUnanswered> => {
  const result = await connection.query(
    'SELECT * FROM question WHERE id = $1',
    [id],
  );

  return result.rows[0];
};

const updateQuestion = async ({ answer, id, token }: QuestionUpdate) => {
  const result = await connection.query(
    'UPDATE question SET answered = true, answered_at = CURRENT_TIMESTAMP, answer = $1, answerer_id = (SELECT id FROM student WHERE token = $2) WHERE id = $3 RETURNING *',
    [answer, token, id],
  );

  return result.rows[0];
};

const selectUnansweredQuestions = async (): Promise<
  QuestionUnansweredWithId[]
> => {
  const result = await connection.query(
    'SELECT question.id, question, student.name AS student, class.name AS class, submited_at FROM question JOIN student ON question.author_id = student.id JOIN class ON student.class_id = class.id WHERE answered = false;',
  );

  return result.rows;
};

const selectUnansweredQuestion = async (
  id: string,
): Promise<QuestionUnanswered[]> => {
  const result = await connection.query(
    'SELECT question, student.name AS student, class.name AS class, tag.name AS tags, answered, submited_at FROM question JOIN question_tag ON question.id = question_tag.question_id JOIN tag ON tag.id = question_tag.tag_id JOIN student ON question.author_id = student.id JOIN class ON student.class_id = class.id WHERE answered = false AND question.id = $1',
    [id],
  );

  return result.rows;
};

const selectAnsweredQuestion = async (
  id: string,
): Promise<QuestionAnswered[]> => {
  const result = await connection.query(
    'SELECT question, student1.name AS student, class.name AS class, tag.name AS tags, answered, submited_at, answered_at, student2.name AS answered_by, answer FROM question JOIN question_tag ON question.id = question_tag.question_id JOIN tag ON tag.id = question_tag.tag_id JOIN student student1 ON question.author_id = student1.id JOIN class ON student1.class_id = class.id JOIN student student2 ON question.answerer_id = student2.id WHERE answered = true AND question.id = $1;',
    [id],
  );

  return result.rows;
};

export {
  findQuestionByText,
  insertQuestion,
  findUserByName,
  insertUser,
  findQuestionById,
  updateQuestion,
  selectUnansweredQuestions,
  selectUnansweredQuestion,
  selectAnsweredQuestion,
};
