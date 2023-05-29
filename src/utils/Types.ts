import { Range } from "../../server/src/types/Range";

export type DataType = { value: string; label: string };

export type cssType = {
  value: keyof CSSStyleDeclaration;
  label: string;
};

export type typeType = {
  value: "range" | "includes" | "multiplicity" | "integer";
  label: string;
};

export type MyChecker = {
  type: "range" | "integer" | "includes" | "multiplicity";
  toBeParsed: "css-property" | "text-content" | "elements" | "images";
  cssProperty?: keyof CSSStyleDeclaration;
  parseBy?: "count" | "byteSize" | "attrs";

  range?: Range;
  variants?: string[];
  multiplesOf?: string[];
};
