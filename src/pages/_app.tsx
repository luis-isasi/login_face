import { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ContextAuthProvider } from '@Context/contextAuth';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <ContextAuthProvider>
        <Component {...pageProps} />
      </ContextAuthProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
