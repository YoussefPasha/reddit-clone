import classNames from "classnames";

interface InputGroupProps {
  className?: string;
  type: string;
  placeholder: string;
  value: string;
  error: string | undefined;
  setValue: (str: string) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({
  error,
  value,
  className,
  children,
  type,
  setValue,
  placeholder,
}) => {
  return (
    <div className={className}>
      <input
        className={classNames(
          "w-full p-3 py-2 transition duration-200 border border-gray-300 rounded outline-none bg-gray-50 focus:bg-white hover:bg-white",
          { "border-red-500": error }
        )}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <small className="font-medium text-red-600">{error}</small>
    </div>
  );
};
export default InputGroup;
