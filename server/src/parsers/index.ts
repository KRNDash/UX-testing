import { Page, ElementHandle } from "puppeteer";
import { Parser, ParserReturn } from "../types/Parser";
import { cssParser } from "./cssParser";
import { elementsParser } from "./elementsParser";
import { imageParser } from "./imageParser";
import { textParser } from "./textParser";

//Получаем значения для проверки одним из 4 парсеров
function getValueToCheck(page: Page, parser: Parser) {
  return async (
    element: ElementHandle<Element>
  ): Promise<number | string | string[]> => {
    if (parser.toBeParsed === "css-property") {
      return cssParser(parser, element);
    }

    if (parser.toBeParsed === "text-content") {
      return textParser(parser, element);
    }

    if (parser.toBeParsed === "elements") {
      return elementsParser(parser, element);
    }

    if (parser.toBeParsed === "images") {
      return imageParser(parser, element, page);
    }

    return 0;
  };
}

//Подсчет количества элементов на странице
export async function parseElements(
  page: Page,
  elementList: ElementHandle<Element>[],
  parser: Parser
): Promise<ParserReturn[]> {
  if (parser.toBeParsed === "elements" && parser.parseBy === "count")
    return [elementList.length];
  return Promise.all(elementList.map(getValueToCheck(page, parser)));
}
