import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// エラー検出リンク
const errorLink = onError(({ graphQLErrors, networkError, operation, response }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL エラー]: メッセージ: ${message}, 場所: ${JSON.stringify(locations)}, パス: ${path}`,
      );
    });
  }
  
  if (networkError) {
    console.error(`[ネットワークエラー]: ${networkError}`);
    console.error('オペレーション詳細:', operation);
    console.error('レスポンス詳細:', response);
  }
});

// デバッグリンク
const debugLink = new ApolloLink((operation, forward) => {
  console.log(`GraphQL リクエスト: ${operation.operationName}`, {
    variables: operation.variables,
    query: operation.query,
  });
  
  return forward(operation).map(response => {
    console.log(`GraphQL レスポンス: ${operation.operationName}`, response);
    return response;
  });
});

// GraphQLエンドポイントのURLを指定
const httpLink = new HttpLink({
  uri: '/api/graphql',
});

// Apollo Clientのインスタンス作成
const client = new ApolloClient({
  link: ApolloLink.from([errorLink, debugLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default client;