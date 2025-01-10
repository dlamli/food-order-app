interface ErrorProps {
  title: string;
  message: string;
  className?: string;
}

const Error = ({ title, message, className }: ErrorProps) => {
  return (
    <div className={`error ${className}`}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Error;
