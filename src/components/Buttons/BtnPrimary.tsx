interface Props {
  onClick?: () => void;
}

const BtnPrimary: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 hover:bg-green-400 text-white font-bold transition-colors duration-200 py-2 px-4 rounded-md outline-none"
    >
      Cerrar sesión
    </button>
  );
};

export default BtnPrimary;
