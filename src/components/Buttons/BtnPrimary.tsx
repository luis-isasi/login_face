interface Props {
  onClick?: () => void;
}

const BtnPrimary: React.FC<Props> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer bg-purple-600 hover:bg-purple-500 text-white rounded-md py-3 px-7 lg:px-9 font-extrabold"
    >
      {children}
    </button>
  );
};

export default BtnPrimary;
