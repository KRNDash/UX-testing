import { DataType } from "../../utils/Types";
import MyDropDown from "../MyDropDown";
import MyTextInput from "../MyTextInput";
import StepTitle from "../StepTitle";

type Props = {
  setSelector: (setSelector: any) => void;
  num: number;
  startText?: string;
};

export default function SecondStep({ setSelector, num, startText }: Props) {
  return (
    <StepTitle
      stepNum={num}
      stepTitle="Перечислите классы, теги или id элементов для проверки"
      input={
        <MyTextInput
          startText={startText}
          onTextChange={setSelector}
          placeholder="Пример: p, div, .myTitle, #mySection, ..."
        ></MyTextInput>
      }
    ></StepTitle>
  );
}

type EditProps = {
  setRuleId: (setRuleId: any) => void;
  options: DataType[] | undefined;
  num: number;
};

export function SecondStepEdit({ setRuleId, options, num }: EditProps) {
  return (
    <StepTitle
      stepNum={num}
      stepTitle="Выберите правило для редактирования из списка"
      input={<MyDropDown onElChange={setRuleId} data={options}></MyDropDown>}
    ></StepTitle>
  );
}
