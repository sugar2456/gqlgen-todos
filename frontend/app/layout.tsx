import { ApolloProviders } from './providers';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js with GraphQL',
  description: 'Next.js application with GraphQL integration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <ApolloProviders>{children}</ApolloProviders>
      </body>
    </html>
  );
}