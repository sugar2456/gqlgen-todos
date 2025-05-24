"use client";

import { GET_USERS } from "@/lib/graphql/queries/userQueries";
import { useQuery } from "@apollo/client";
import { UserList } from "./user_list";

export default function UsersClient() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>読み込み中</p>;

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

  const users = data?.users || [];

  return <UserList users={users} />;
}
