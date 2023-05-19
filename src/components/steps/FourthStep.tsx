import { DataType } from "../../utils/Types";
import MyDropDown from "../MyDropDown";
import StepTitle from "../StepTitle";

type Props = {
  stepTitle: string;
  getter: (setProperty: any) => void;
  options: DataType[];
};

export default function FourthStep({ stepTitle, getter, options }: Props) {
  return (
    <StepTitle
      stepNum={4}
      stepTitle={stepTitle}
      input={<MyDropDown onElChange={getter} data={options}></MyDropDown>}
    ></StepTitle>
  );
}
