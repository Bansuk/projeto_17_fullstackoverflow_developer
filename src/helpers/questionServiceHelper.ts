import { QuestionUnanswered } from '../interfaces/question';

const rearrangeTags = (items: QuestionUnanswered[]) => {
  let tags = '';
  items.forEach((item, idx, array) => {
    if (idx === array.length - 1) {
      tags += item.tags;
    } else tags += `${item.tags}, `;
  });

  return tags;
};

export { rearrangeTags };
