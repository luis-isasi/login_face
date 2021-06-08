import { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ContextAuthProvider } from '@Context/contextAuth';
import ProtectRouteAuth from '@Hoc/ProtectRouteAuth';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <ContextAuthProvider>
        {pageProps.requireAuth ? (
          <ProtectRouteAuth>
            <Component {...pageProps} />
          </ProtectRouteAuth>
        ) : (
          <Component {...pageProps} />
        )}
      </ContextAuthProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
