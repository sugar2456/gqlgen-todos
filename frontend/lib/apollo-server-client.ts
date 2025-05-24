import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // サーバーサイドではURLを完全に指定する必要がある
      uri: 'http://backend:8080/query',
      // 本番環境では環境変数を使うとよい
      // uri: process.env.GRAPHQL_ENDPOINT,
      fetchOptions: { cache: 'no-store' }
    }),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
    ssrMode: true, // サーバーサイドレンダリングモードを有効化
  });
});
