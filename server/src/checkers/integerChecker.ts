import { IntegerChecker, CheckResult } from "../types/Checker";
import { ParserReturn } from "../types/Parser";

//Проверка на целостность числа
export function integerChecker(
  value: ParserReturn,
  checker: IntegerChecker
): CheckResult {
  return new CheckResult(checker, value, Number.isInteger(Number(value)));
}
