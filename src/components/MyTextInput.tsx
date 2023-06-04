import "../styles/style.css";

type Props = {
  onTextChange: (setData: string) => void;
  startText?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

//Поле для ввода чисел
export default function MyTextInput({
  onTextChange,
  startText,
  placeholder = "Введите значение",
  ...rest
}: Props) {
  //   let value = 0;

  return (
    <div>
      {/* <label htmlFor="exampleInputEmail1">Email address</label> */}
      <input
        type="text"
        className="form-control"
        id="exampleInputEmail1"
        placeholder={placeholder}
        {...rest}
        onChange={(e) => onTextChange(e.target.value)}
        value={startText}
      />
    </div>
  );
}
