import "../style.css";
import { RulesConfig } from "../../server/src/types/Config";
import { CheckResult } from "../../server/src/types/Checker";

type Params = {
  res: RulesConfig<CheckResult[]>[] | null;
};

//Таблица с результатами по одной секции
export function MyTable({ res }: Params) {
  return (
    <>
      <h3 className="text_h3 col-8">{res ? res[0].section : ""}</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Правило</th>
            <th scope="col">Результат</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{res ? res[0].rules[0].ruleName : "ded"}</td>
            <td>
              <input type="checkbox" id="rule1" name="rule1" disabled />
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="td_error">
              <strong>Элементы не удовлетворяющие правилу</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
