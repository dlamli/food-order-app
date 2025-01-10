interface InputProps {
  label: string;
  id: string;
  type: string;
}

const Input = ({ id, label, ...props }: InputProps) => {
  return (
    <p className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} required {...props} />
    </p>
  );
};

export default Input;
