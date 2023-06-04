import { DataType } from "../../utils/Types";
import MyDropDown from "../MyDropDown";
import StepTitle from "../StepTitle";

type Props = {
  stepTitle: string;
  getter: (setProperty: any) => void;
  options: DataType[];
  num: number;
};

export default function FourthStep({ stepTitle, getter, options, num }: Props) {
  return (
    <StepTitle
      stepNum={num}
      stepTitle={stepTitle}
      input={<MyDropDown onElChange={getter} data={options}></MyDropDown>}
    ></StepTitle>
  );
}
