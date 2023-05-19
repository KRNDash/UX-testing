import MyTextInput from "../MyTextInput";

type Props = {
  setVariants: (setVariants: any) => void;
};

export default function IncludeInput({ setVariants }: Props) {
  return (
    <div className="includesWrapper">
      <MyTextInput onTextChange={setVariants}></MyTextInput>
    </div>
  );
}
