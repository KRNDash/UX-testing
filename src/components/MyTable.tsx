import "../styles/style.css";
import { RulesConfig } from "../../server/src/types/Config";
import { CheckResult, Checker } from "../../server/src/types/Checker";
// import { useState } from "react";
import Rules from "./Rules";

type Props = {
  section: RulesConfig<CheckResult[]> | RulesConfig<Checker> | null;
};

//Таблица с результатами по одной секции
export function MyTable({ section }: Props) {
  // function getList() {
  //   setPercentList(percentList);
  // }

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
              <Rules rule={rule}></Rules>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}

//Таблица с результатами по одной секции
export function MyTable2({ section }: Props) {
  // function getList() {
  //   setPercentList(percentList);
  // }

  return (
    <>
      <h3 className="text_h3 col-8">{section ? section.section : ""}</h3>
      <table className="table">
        {/* <thead>
          <tr className="table-primary">
            <th scope="col">Правило</th>
          </tr>
        </thead> */}
        <tbody>
          {section?.rules.map((rule) => (
            <>
              <tr className="">
                <td className="tdWrapper">{rule.ruleName}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}
