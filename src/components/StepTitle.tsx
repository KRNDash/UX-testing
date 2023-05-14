import "../styles/style.css";
import Select from "react-select";

type Props = {
  stepNum: number;
  stepTitle: string;
  input: React.ReactNode;
};

export default function StepTitle({ stepNum, stepTitle, input }: Props) {
  return (
    <>
      <div className="inputWrapper d-flex align-items-top">
        <div className="numberCircle col-1">{stepNum}</div>
        <div className="col-11 offset">
          <p className="col-11 dropTitle">{stepTitle}</p>
          {input}
        </div>
      </div>
    </>
  );
}
