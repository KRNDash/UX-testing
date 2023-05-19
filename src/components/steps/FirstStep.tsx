import { DataType } from "../../utils/Types";
import MyDropDown from "../MyDropDown";
import StepTitle from "../StepTitle";

type Props = {
  setSection: (setSection: any) => void;
  titleOptions: DataType[];
};

export default function FirstStep({ setSection, titleOptions }: Props) {
  return (
    <StepTitle
      stepNum={1}
      stepTitle="В какой раздел добавить правило?"
      input={
        <MyDropDown onElChange={setSection} data={titleOptions}></MyDropDown>
      }
    ></StepTitle>
  );
}
