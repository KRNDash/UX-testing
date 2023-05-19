import MyTextInput from "../MyTextInput";
import StepTitle from "../StepTitle";

type Props = {
  setRuleText: (setRuleText: any) => void;
};

export default function ThirdStep({ setRuleText }: Props) {
  return (
    <StepTitle
      stepNum={3}
      stepTitle="Укажите название правила на русском языке"
      input={<MyTextInput onTextChange={setRuleText}></MyTextInput>}
    ></StepTitle>
  );
}
