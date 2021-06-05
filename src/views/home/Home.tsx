import { useContextAuth } from '@Context/contextAuth';

const Home = () => {
  const { user, signoutUser } = useContextAuth();
  console.log({ user });

  return <div className="text-white">{user?.username}</div>;
};

export default Home;
