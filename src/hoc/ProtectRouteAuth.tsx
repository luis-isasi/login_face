import * as React from 'react';
import { useRouter } from 'next/router';

import { useContextAuth } from '@Context/contextAuth';
import LoadingScreen from '@Components/LoadingScreen';

const ProtectRouteAuth = ({ children }) => {
  const router = useRouter();
  const { user, isLoading } = useContextAuth();

  React.useEffect(() => {
    //pass the current
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading]);

  if (isLoading) return <LoadingScreen />;

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectRouteAuth;
