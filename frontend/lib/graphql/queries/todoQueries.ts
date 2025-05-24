import { gql } from '@apollo/client';

// すべてのTodoを取得するクエリ
export const GET_TODOS = gql`
  query Todos {
    todos {
      id
      text
      done
    }
  }
`;

// Todoフラグメントの定義（再利用可能なフィールド定義）
export const TODO_FRAGMENT = gql`
  fragment TodoFields on Todo {
    id
    text
    done
  }
`;

// フラグメントを使用するクエリの例
export const GET_TODOS_WITH_FRAGMENT = gql`
  ${TODO_FRAGMENT}
  query TodosWithFragment {
    todos {
      ...TodoFields
    }
  }
`;
