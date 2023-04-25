import { RangeChecker, CheckResult } from "../types/Checker";
import { ParserReturn } from "../types/Parser";
import { Range } from "../types/Range";

function inRange(range: Range, value: number): boolean {
  if (range[0] === null && range[1] !== null) return value <= range[1];
  if (range[0] !== null && range[1] === null) return value >= range[0];
  if (range[0] !== null && range[1] !== null)
    return value >= range[0] && value <= range[1];
  return true;
}

export function rangeChecker(
  value: ParserReturn,
  checker: RangeChecker
): CheckResult {
  if (typeof value === "string") {
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) value = value.length;
    else value = parsedValue;
  } else if (Array.isArray(value)) value = value.length;
  return new CheckResult(checker, value, inRange(checker.range, value));
}
