import { ElementHandle } from "puppeteer";
import { ElementsParser } from "../types/Parser";

export async function elementsParser(
  parser: ElementsParser,
  element: ElementHandle<Element>
): Promise<string[]> {
  if (parser.parseBy === "attrs")
    return element.evaluate((el) => el.getAttributeNames());
  console.error(parser);
  console.error("поле parser.parseBy не установлено");
  return [];
}
