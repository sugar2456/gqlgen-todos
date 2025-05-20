'use client';

import dynamic from 'next/dynamic';

// クライアントコンポーネントを動的にインポート
const GraphQLExample = dynamic(() => import('./graph_ql_example'), {
  ssr: false,
  loading: () => <p>Loading GraphQL component...</p>
});

export default function ClientWrapper() {
  return <GraphQLExample />;
}