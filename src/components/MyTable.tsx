import "../styles/style.css";
import { RulesConfig } from "../../server/src/types/Config";
import { CheckResult } from "../../server/src/types/Checker";

type Props = {
  section: RulesConfig<CheckResult[]> | null;
};

//Проверка на выполнение правила (поиск ошибки)
function getCheck(checkers: CheckResult[][]): boolean {
  let isError = false;

  for (const check of checkers) {
    isError = Boolean(check.find((result) => result.result));
  }

  return isError;
}

//Таблица с результатами по одной секции
export function MyTable({ section }: Props) {
  const rule = section?.rules.map((rule) => (
    <tr>
      <td>{rule.ruleName}</td>
      <td>
        <input
          type="checkbox"
          id="rule1"
          name="rule1"
          checked={getCheck(rule.сheckers)}
          disabled
        />
      </td>
    </tr>
  ));

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
          {rule}
          {/* <tr>
            <td colSpan={2} className="td_error">
              <strong>Элементы не удовлетворяющие правилу</strong>
            </td>
          </tr> */}
        </tbody>
      </table>
    </>
  );
}
