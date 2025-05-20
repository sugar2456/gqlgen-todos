'use client';

import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';

// Todosクエリ
const GET_TODOS = gql`
  query Todos {
    todos {
      id
      text
      done
    }
  }
`;

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

export default function TodoList() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  if (loading) return (
    <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
      <p className="text-center">読み込み中...</p>
    </div>
  );

  if (error) return (
    <div className="p-4 border rounded-lg bg-red-50 text-red-700">
      <h2 className="text-xl font-bold mb-2">エラーが発生しました</h2>
      <p>{error.message}</p>
      <details className="mt-2">
        <summary>詳細情報</summary>
        <pre className="text-sm mt-2 p-2 bg-gray-100 overflow-auto">
          {JSON.stringify(error, null, 2)}
        </pre>
      </details>
    </div>
  );

  const todos = data?.todos || [];

  return (
    <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4">Todo リスト</h2>
      
      {todos.length === 0 ? (
        <p className="text-center">Todoが登録されていません</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {todos.map((todo: Todo) => (
            <li 
              key={todo.id} 
              className={`py-3 flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-2 rounded ${
                todo.done ? 'text-gray-400 line-through' : ''
              }`}
              onClick={() => setSelectedTodo(todo)}
            >
              <span>{todo.text}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                todo.done ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {todo.done ? '完了' : '未完了'}
              </span>
            </li>
          ))}
        </ul>
      )}
      
      {selectedTodo && (
        <div className="mt-4 p-3 border rounded bg-white dark:bg-gray-700">
          <h3 className="font-bold">選択したTodo:</h3>
          <p>ID: {selectedTodo.id}</p>
          <p>内容: {selectedTodo.text}</p>
          <p>状態: {selectedTodo.done ? '完了' : '未完了'}</p>
          <button 
            className="mt-2 px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300"
            onClick={() => setSelectedTodo(null)}
          >
            閉じる
          </button>
        </div>
      )}
    </div>
  );
}