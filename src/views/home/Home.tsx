import { useContextAuth } from '@Context/contextAuth';

const Home = () => {
  const { user, signoutUser } = useContextAuth();
  console.log({ user });

  return (
    <div className="text-white">
      {user?.username}
      <style global jsx>{`
        body {
          background-color: rgba(24, 27, 50, 1) !important;
        }
      `}</style>
    </div>
  );
};

export default Home;
