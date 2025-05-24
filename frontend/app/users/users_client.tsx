"use client";

import { GET_USERS } from "@/lib/graphql/queries/userQueries";
import { useQuery } from "@apollo/client";
import { UserList } from "./user_list";

interface User {
  id: string | number;
  name: string;
}

interface UsersData {
  users: User[];
}

interface UsersClientProps {
  initialData?: UsersData;
}

export default function UsersClient({ initialData }: UsersClientProps) {
  // initialDataが存在する場合は使用し、存在しない場合は通常のクエリを実行
  const { loading, error, data } = useQuery<UsersData>(GET_USERS);
  
  // サーバーから取得したデータまたはクエリ結果を使用
  const userData = data || initialData;

  if (loading && !initialData) return <p>読み込み中...</p>;

  if (error) {
    return (
      <div>
        <h2>エラーが発生しました</h2>
        <p>{error.message}</p>
        <details>
          <summary>詳細情報</summary>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </details>
      </div>
    );
  }

  const users = userData?.users || [];

  return <UserList users={users} />;
}
