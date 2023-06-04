import "../styles/style.css";
import Select from "react-select";
import { DataType, cssType, typeType } from "../utils/Types";

type Props = {
  onElChange: (setData: any) => void;
  data: DataType[] | typeType[] | cssType[] | undefined;
};

export default function MyDropDown({ data, onElChange }: Props) {
  // const handleChange = (selectedOption: DataType<DataType>) => {
  //   onElChange(selectedOption?.value);
  // };

  const handleChange = (selectedOption: any) => {
    onElChange(selectedOption.value);
  };

  return (
    <>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={data?.[0]}
        name="list"
        onChange={handleChange}
        options={data}
      />
    </>
  );
}
