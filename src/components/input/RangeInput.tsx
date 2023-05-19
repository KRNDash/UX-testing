import MyNumberInput from "../MyNumberInput";

type Props = {
  setMin: (setMin: any) => void;
  setMax: (setMax: any) => void;
};

export default function RangeInput({ setMin, setMax }: Props) {
  return (
    <div className="d-flex offset-md-1">
      <div className="rangeWrapper">
        <MyNumberInput onNumberChange={setMin}></MyNumberInput>
      </div>
      <div className="rangeWrapper offset">
        <MyNumberInput onNumberChange={setMax}></MyNumberInput>
      </div>
    </div>
  );
}
