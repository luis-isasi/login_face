import { useRouter } from 'next/router';

interface PropsBtn {
  isDisabled: boolean;
}

const Btn: React.FC<PropsBtn> = ({ isDisabled }) => {
  const router = useRouter();

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className="bg-purple-600 disabled:bg-gray-400 disabled:opacity-80 font-extrabold rounded h-14 w-full px-5 mb-4 text-white disabled:cursor-not-allowed"
    >
      {router.pathname === '/register' ? 'Regístrate' : 'Inicia sesión'}
    </button>
  );
};

export default Btn;
