import { MultiplicityChecker, CheckResult } from "../types/Checker";
import { ParserReturn } from "../types/Parser";

//Проверка на кратность числу
export function multiplicityChecker(
  value: ParserReturn,
  checker: MultiplicityChecker
): CheckResult {
  if (Array.isArray(value))
    throw new CheckResult(checker, value, false, "Представлен массив значений");
  else if (typeof value === "string") value = parseInt(value);
  if (isNaN(value)) throw new CheckResult(checker, value, false, "");
  return new CheckResult(
    checker,
    value,
    checker.multiplesOf
      .map((divider) => Number(value) % divider === 0)
      .some(Boolean)
  );
}
