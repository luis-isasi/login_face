import { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default MyApp;
