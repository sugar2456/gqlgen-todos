import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: Todo;
};


export type MutationCreateTodoArgs = {
  input: NewTodo;
};

export type NewTodo = {
  text: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  todos: Array<Todo>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type Todo = {
  __typename?: 'Todo';
  done: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
  user: User;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CreateTodoMutationVariables = Exact<{
  text: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type CreateTodoMutation = { __typename?: 'Mutation', createTodo: { __typename?: 'Todo', id: string, text: string, done: boolean } };

export type TodosQueryVariables = Exact<{ [key: string]: never; }>;


export type TodosQuery = { __typename?: 'Query', todos: Array<{ __typename?: 'Todo', id: string, text: string, done: boolean }> };

export type TodoFieldsFragment = { __typename?: 'Todo', id: string, text: string, done: boolean };

export type TodosWithFragmentQueryVariables = Exact<{ [key: string]: never; }>;


export type TodosWithFragmentQuery = { __typename?: 'Query', todos: Array<{ __typename?: 'Todo', id: string, text: string, done: boolean }> };

export const TodoFieldsFragmentDoc = gql`
    fragment TodoFields on Todo {
  id
  text
  done
}
    `;
export const CreateTodoDocument = gql`
    mutation CreateTodo($text: String!, $userId: String!) {
  createTodo(input: {text: $text, userId: $userId}) {
    ...TodoFields
  }
}
    ${TodoFieldsFragmentDoc}`;
export type CreateTodoMutationFn = Apollo.MutationFunction<CreateTodoMutation, CreateTodoMutationVariables>;

/**
 * __useCreateTodoMutation__
 *
 * To run a mutation, you first call `useCreateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTodoMutation, { data, loading, error }] = useCreateTodoMutation({
 *   variables: {
 *      text: // value for 'text'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateTodoMutation(baseOptions?: Apollo.MutationHookOptions<CreateTodoMutation, CreateTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTodoMutation, CreateTodoMutationVariables>(CreateTodoDocument, options);
      }
export type CreateTodoMutationHookResult = ReturnType<typeof useCreateTodoMutation>;
export type CreateTodoMutationResult = Apollo.MutationResult<CreateTodoMutation>;
export type CreateTodoMutationOptions = Apollo.BaseMutationOptions<CreateTodoMutation, CreateTodoMutationVariables>;
export const TodosDocument = gql`
    query Todos {
  todos {
    id
    text
    done
  }
}
    `;

/**
 * __useTodosQuery__
 *
 * To run a query within a React component, call `useTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodosQuery({
 *   variables: {
 *   },
 * });
 */
export function useTodosQuery(baseOptions?: Apollo.QueryHookOptions<TodosQuery, TodosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TodosQuery, TodosQueryVariables>(TodosDocument, options);
      }
export function useTodosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TodosQuery, TodosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TodosQuery, TodosQueryVariables>(TodosDocument, options);
        }
export function useTodosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TodosQuery, TodosQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TodosQuery, TodosQueryVariables>(TodosDocument, options);
        }
export type TodosQueryHookResult = ReturnType<typeof useTodosQuery>;
export type TodosLazyQueryHookResult = ReturnType<typeof useTodosLazyQuery>;
export type TodosSuspenseQueryHookResult = ReturnType<typeof useTodosSuspenseQuery>;
export type TodosQueryResult = Apollo.QueryResult<TodosQuery, TodosQueryVariables>;
export const TodosWithFragmentDocument = gql`
    query TodosWithFragment {
  todos {
    ...TodoFields
  }
}
    ${TodoFieldsFragmentDoc}`;

/**
 * __useTodosWithFragmentQuery__
 *
 * To run a query within a React component, call `useTodosWithFragmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodosWithFragmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodosWithFragmentQuery({
 *   variables: {
 *   },
 * });
 */
export function useTodosWithFragmentQuery(baseOptions?: Apollo.QueryHookOptions<TodosWithFragmentQuery, TodosWithFragmentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TodosWithFragmentQuery, TodosWithFragmentQueryVariables>(TodosWithFragmentDocument, options);
      }
export function useTodosWithFragmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TodosWithFragmentQuery, TodosWithFragmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TodosWithFragmentQuery, TodosWithFragmentQueryVariables>(TodosWithFragmentDocument, options);
        }
export function useTodosWithFragmentSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TodosWithFragmentQuery, TodosWithFragmentQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TodosWithFragmentQuery, TodosWithFragmentQueryVariables>(TodosWithFragmentDocument, options);
        }
export type TodosWithFragmentQueryHookResult = ReturnType<typeof useTodosWithFragmentQuery>;
export type TodosWithFragmentLazyQueryHookResult = ReturnType<typeof useTodosWithFragmentLazyQuery>;
export type TodosWithFragmentSuspenseQueryHookResult = ReturnType<typeof useTodosWithFragmentSuspenseQuery>;
export type TodosWithFragmentQueryResult = Apollo.QueryResult<TodosWithFragmentQuery, TodosWithFragmentQueryVariables>;