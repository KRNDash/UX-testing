import MyTextInput from "../MyTextInput";
import StepTitle from "../StepTitle";

type Props = {
  setSelector: (setSelector: any) => void;
};

export default function SecondStep({ setSelector }: Props) {
  return (
    <StepTitle
      stepNum={2}
      stepTitle="Перечислите классы, теги или id элементов для проверки"
      input={
        <MyTextInput
          onTextChange={setSelector}
          placeholder="Пример: p, div, .myTitle, #mySection, ..."
        ></MyTextInput>
      }
    ></StepTitle>
  );
}
