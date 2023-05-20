import { useState } from "react";
import { CheckResult } from "../../server/src/types/Checker";
import { Rule } from "../../server/src/types/Config";
import "../styles/style.css";

type Props = {
  rule: Rule<CheckResult[]>;
};

export default function Rules({ rule }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  //Проверка на выполнение правила (поиск ошибки)
  function getCheck(checkers: CheckResult[][]): {
    percent: number;
    error: (string | undefined)[];
  } {
    const errorElements: (string | undefined)[] = [];
    // let percentResult = 0;
    let errorCounter = 0;
    let length = 0;

    for (const check of checkers) {
      check.map(function (result) {
        length++;
        if (result.result == false) {
          errorElements.push(
            String(result.resultText) +
              " (Значение: " +
              String(result.value) +
              " )"
          );
          // console.log(result.value);
          errorCounter++;
        }
      });
      // console.log(errorElements);
    }

    const percent = parseFloat(
      (100 - (errorCounter / length) * 100).toFixed(1)
    );

    return {
      percent: percent,
      error: errorElements,
    };
  }

  function handleClick() {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  }

  const result = getCheck(rule.сheckers);

  const openLink = (
    <>
      <div>
        <a onClick={handleClick} className="icon-link">
          {isOpen ? "Закрыть лист ошибок ↑" : "Открыть лист ошибок ↓"}
        </a>
      </div>
      {isOpen && (
        <ol>
          {result.error.map(function (error) {
            return <li className="errorText">{error}</li>;
          })}
        </ol>
      )}
    </>
  );

  return (
    <>
      <tr className="">
        <td className="tdWrapper">
          {rule.ruleName}
          {result.error.length != 0 ? openLink : ""}
        </td>
        <th className="resultPercent">{result.percent + "%"}</th>
      </tr>
    </>
  );
}
