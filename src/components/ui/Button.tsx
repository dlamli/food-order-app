interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  textOnly?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}

const Button = ({ children, textOnly, className, ...props }: ButtonProps) => {
  let cssClass = textOnly ? "text-button" : "button";
  cssClass += ` ${className}`;
  return (
    <button className={cssClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
