import { Parser, ParserReturn } from "./Parser";
import { Range } from "./Range";

export type RangeChecker = Parser & {
  type: "range";
  range: Range;
};

export type IncludesVariant = string | number;

export type IncludesChecker = Parser & {
  type: "includes";
  variants: IncludesVariant[];
  strict?: boolean;
};

export type IntegerChecker = Parser & {
  type: "integer";
};

export type MultiplicityChecker = Parser & {
  type: "multiplicity";
  multiplesOf: number[];
};

export type Checker =
  | IncludesChecker
  | RangeChecker
  | MultiplicityChecker
  | IntegerChecker;

export class CheckResult {
  checker: Checker;
  value: ParserReturn;
  result: boolean;
  resultText?: string;

  constructor(
    checker: Checker,
    value: ParserReturn,
    result: boolean,
    resultText?: string
  ) {
    this.checker = checker;
    this.value = value;
    this.result = result;
    this.resultText = resultText;
  }
}
