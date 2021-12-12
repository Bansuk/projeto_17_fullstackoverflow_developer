import connection from '../database/database';

const findOne = async (relation: string, one: string) => {
  const result = await connection.query(
    `SELECT * FROM ${relation} WHERE name = $1;`,
    [one],
  );

  return result.rowCount;
};

const insertClass = async (className: string) => {
  if (await findOne('class', className)) return;
  await connection.query('INSERT INTO class (name) VALUES ($1) RETURNING *;', [
    className,
  ]);
};

const insertStudent = async (
  student: string,
  className: string,
  token: string = '',
) => {
  if (await findOne('student', student)) return;
  await connection.query(
    'INSERT INTO student(name, token, class_id) VALUES ($1, $2, (SELECT id FROM class WHERE name = $3));',
    [student, token, className],
  );
};

const insertTag = async (tag: string) => {
  if (await findOne('tag', tag)) return;
  await connection.query('INSERT INTO tag (name) VALUES ($1)', [tag]);
};

const insertQuestionTag = async (question: string, tag: string) => {
  await connection.query(
    'INSERT INTO question_tag (question_id, tag_id) VALUES ((SELECT id FROM question WHERE question = $1), (SELECT id FROM tag WHERE name = $2));',
    [question, tag],
  );
};

export { findOne, insertClass, insertStudent, insertTag, insertQuestionTag };
