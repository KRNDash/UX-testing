import "../styles/style.css";
import { RulesConfig } from "../../server/src/types/Config";
import { CheckResult } from "../../server/src/types/Checker";
// import { useState } from "react";
import Rules from "./Rules";
import { useState } from "react";

type Props = {
  section: RulesConfig<CheckResult[]> | null;
  // setPercentList: (setPercentList: any) => void;
};

//Таблица с результатами по одной секции
export function MyTable({ section }: Props) {
  const [percent, setPercent] = useState(0);
  // const percentList: number[] = [];

  return (
    <>
      <h3 className="text_h3 col-8">{section ? section.section : ""}</h3>
      <table className="table">
        <thead>
          <tr className="table-primary">
            <th scope="col">Правило</th>
            <th scope="col">Результат</th>
          </tr>
        </thead>
        <tbody>
          {section?.rules.map((rule) => (
            <>
              <Rules setPercent={setPercent} rule={rule}></Rules>
              {/* {percentList.push(percent)} */}
            </>
          ))}
        </tbody>
      </table>
      {/* {setPercentList(percentList)} */}
    </>
  );
}
