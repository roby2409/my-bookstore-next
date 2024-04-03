interface RoundedButtonBoxProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children?: React.ReactNode | undefined;
  title?: string | undefined;
}

export const RoundedButtonBox: React.FC<RoundedButtonBoxProps> = ({
  onClick,
  children,
  title,
}) => {
  return (
    <button
      className={`ring-teal-400 bg-gray-200 text-gray-800 hover:bg-gray-200 hover:translate-y-1rounded-lg ml-auto flex h-9 w-9 items-center justify-center
    rounded-lg outline-none duration-300 focus:ring-4 focus:ring-offset-2`}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
};
