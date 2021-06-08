import { useContextAuth } from '@Context/contextAuth';
import BtnPrimary from '@Components/Buttons/BtnPrimary';

const Home = () => {
  const { user, signoutUser } = useContextAuth();

  const handleOnClick = () => {
    signoutUser();
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="text-white box-border p-10 mx-auto container md:max-w-xl xl:max-w-5xl h-auto flex flex-col items-center">
        <span className="text-5xl text-center my-5 font-extrabold">{`Que tal ${
          user ? user.usuario : ''
        } 😀`}</span>
        <p className="text-center text-lg my-8">
          Estoy encantado de que hayas probado mi sistema de registro e inicio
          de sesión con reconocimiento facial, esperamos que sea de tu agrado.
          😀😃😃
        </p>
        <p className="text-lg"> 😄 Puedes ver el repositorio aquí 😄</p>
        <p className="text-xl my-8">
          👉
          <a
            target="_blank"
            href="https://github.com/luis-isasi/login_face"
            rel="noreferrer"
            className="py-2 px-4 rounded-md outline-none text-purple-400"
          >
            Repositorio
          </a>
          👈
        </p>
        <BtnPrimary onClick={handleOnClick}>Cerrar sesión</BtnPrimary>
      </div>
    </div>
  );
};

export const getServerSideProps = () => {
  return {
    props: {
      requireAuth: true,
    },
  };
};

export default Home;
