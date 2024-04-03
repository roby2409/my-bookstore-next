import cn from "classnames";
export interface TextProps {
  children: React.ReactNode;
  style?: React.CSSProperties | undefined;
  className?: string;
}

const Text: React.FC<TextProps> = ({ children, style, className }) => {
  return (
    <p className={cn("p-2 text-sm text-gray-600 ", className)} style={style}>
      {children}
    </p>
  );
};

export default Text;
