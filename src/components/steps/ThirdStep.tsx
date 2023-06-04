import MyTextInput from "../MyTextInput";
import StepTitle from "../StepTitle";

type Props = {
  setRuleText: (setRuleText: any) => void;
  num: number;
  startText?: string;
};

export default function ThirdStep({ setRuleText, num, startText }: Props) {
  return (
    <StepTitle
      stepNum={num}
      stepTitle="Укажите название правила на русском языке"
      input={
        <MyTextInput
          startText={startText}
          onTextChange={setRuleText}
        ></MyTextInput>
      }
    ></StepTitle>
  );
}
