import {
  IncludesChecker,
  CheckResult,
  IncludesVariant,
} from "../types/Checker";
import { ParserReturn } from "../types/Parser";

function includes(value: ParserReturn, variants: IncludesVariant[]): boolean {
  if (Array.isArray(value))
    return Boolean(variants.find((variant) => value.includes(String(variant))));
  return variants.includes(value);
}

export function includesChecker(
  value: ParserReturn,
  checker: IncludesChecker
): CheckResult {
  return new CheckResult(checker, value, includes(value, checker.variants));
}
