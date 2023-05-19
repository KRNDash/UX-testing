import MyTextInput from "../MyTextInput";

type Props = {
  setMultiplesOf: (setMultiplesOf: any) => void;
};

export default function MultiplyInput({ setMultiplesOf }: Props) {
  return (
    <div className="includesWrapper">
      <MyTextInput onTextChange={setMultiplesOf}></MyTextInput>
    </div>
  );
}
