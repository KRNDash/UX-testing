import { IntegerChecker, CheckResult } from "../types/Checker";
import { ParserReturn } from "../types/Parser";

export function integerChecker(
  value: ParserReturn,
  checker: IntegerChecker
): CheckResult {
  return new CheckResult(checker, value, Number.isInteger(Number(value)));
}
