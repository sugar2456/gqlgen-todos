'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_TODO } from '@/lib/graphql/mutations/todoMutations';
import { GET_TODOS } from '@/lib/graphql/queries/todoQueries';
import { CreateTodoMutation, CreateTodoMutationVariables } from '@/lib/graphql/generated/types';

export default function CreateTodoForm() {
  const [text, setText] = useState('');
  const [createTodo, { loading, error }] = useMutation<
    CreateTodoMutation,
    CreateTodoMutationVariables
  >(CREATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
    onCompleted: () => {
      setText('');
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    try {
      await createTodo({
        variables: {
          text,
          userId: "user1" // 実際のユーザーIDに置き換える
        }
      });
    } catch (err) {
      console.error('Todo作成エラー:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="新しいTodoを入力..."
          className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-300"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 disabled:bg-blue-300"
          disabled={loading || !text.trim()}
        >
          {loading ? '追加中...' : '追加'}
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2">{error.message}</p>
      )}
    </form>
  );
}
