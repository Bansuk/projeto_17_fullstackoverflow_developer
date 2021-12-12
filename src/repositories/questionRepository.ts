import connection from '../database/database';
import * as helper from '../helpers/questionRepositoryHelper';
import { QuestionDB } from '../interfaces/question';

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

export { findQuestionByText, insertQuestion };
