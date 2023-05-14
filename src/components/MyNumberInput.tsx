import "../styles/style.css";

type Props = {
  onNumberChange: (setData: number) => void;
};

//Поле для ввода чисел
export default function MyNumberInput({ onNumberChange }: Props) {
  //   let value = 0;

  return (
    <div>
      {/* <label htmlFor="exampleInputEmail1">Email address</label> */}
      <input
        type="number"
        className="form-control"
        id="exampleInputEmail1"
        placeholder="10"
        onChange={(e) => onNumberChange(Number(e.target.value))}
      />
    </div>
  );
}
