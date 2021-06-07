import Link from './Link';

interface Props {
  href: string;
}

const LinkPrimaryBorder: React.FC<Props> = ({ href, children }) => {
  return (
    <Link
      className={`cursor-pointer bg-purple-600 hover:bg-purple-500 text-white rounded-md py-3 px-7 lg:px-9 font-extrabold`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default LinkPrimaryBorder;
