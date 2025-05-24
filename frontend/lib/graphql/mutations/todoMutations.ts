import { gql } from '@apollo/client';
import { TODO_FRAGMENT } from '../queries/todoQueries';

// 新しいTodoを作成するミューテーション
export const CREATE_TODO = gql`
  ${TODO_FRAGMENT}
  mutation CreateTodo($text: String!, $userId: String!) {
    createTodo(input: { text: $text, userId: $userId }) {
      ...TodoFields
    }
  }
`;
