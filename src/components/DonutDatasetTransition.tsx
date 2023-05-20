import { useState } from "react";
// import { data, data2 } from "./data";
import { DonutChart } from "./DonutChart";

const BUTTONS_HEIGHT = 50;

type DataItem = {
  name: string;
  value?: number;
};

type DonutDatasetTransitionProps = {
  width: number;
  height: number;
  data: DataItem[];
};

export const DonutDatasetTransition = ({
  width,
  height,
  data,
}: DonutDatasetTransitionProps) => {
  const [selectedData, setSelectedData] = useState(data);

  return (
    <div>
      <DonutChart
        width={width}
        height={height - BUTTONS_HEIGHT}
        data={selectedData}
      />
    </div>
  );
};
