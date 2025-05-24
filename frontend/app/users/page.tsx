import UsersClient from "./users_client";
import { getClient } from "@/lib/apollo-server-client";
import { GET_USERS } from "@/lib/graphql/queries/userQueries";

export default async function Page() {
  // サーバーサイドでGraphQLクエリを実行
  const { data } = await getClient().query({
    query: GET_USERS
  });
  
  // 初期データをクライアントコンポーネントに渡す
  return <UsersClient initialData={data} />;
}
