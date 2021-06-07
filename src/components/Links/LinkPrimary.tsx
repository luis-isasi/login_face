import Link from './Link';

interface Props {
  href: string;
}

const LinkPrimaryBorder: React.FC<Props> = ({ href, children }) => {
  return (
    <Link
      className={` cursor-pointer bg-purple-600 text-white rounded-md py-3  px-7 lg:px-9 font-extrabold  hover:bg-primary-light lg:hover:bg-purple-500`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default LinkPrimaryBorder;
