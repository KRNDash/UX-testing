import { cssParser } from "../parsers/cssParser";
import { elementsParser } from "../parsers/elementsParser";
import { imageParser } from "../parsers/imageParser";
import { textParser } from "../parsers/textParser";

export type CssParser = {
  toBeParsed: "css-property";
  cssProperty: keyof CSSStyleDeclaration;
};

export type TextParser = {
  toBeParsed: "text-content";
  parseBy: "count";
};

export type ElementsParser = {
  toBeParsed: "elements";
  parseBy: "count" | "attrs";
};

export type ImageParser = {
  toBeParsed: "images";
  parseBy: "byteSize";
};

export type Parser = CssParser | TextParser | ElementsParser | ImageParser;

export type CssParserReturn = Awaited<ReturnType<typeof cssParser>>;
export type ElementsParserReturn = Awaited<ReturnType<typeof elementsParser>>;
export type ImageParserReturn = Awaited<ReturnType<typeof imageParser>>;
export type TextParserReturn = Awaited<ReturnType<typeof textParser>>;

export type ParserReturn =
  | CssParserReturn
  | TextParserReturn
  | ImageParserReturn
  | ElementsParserReturn;
