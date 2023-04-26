import { ElementHandle } from "puppeteer";
import { ElementsParser } from "../types/Parser";

//Получаем элемент разметки
export async function elementsParser(
  parser: ElementsParser,
  element: ElementHandle<Element>
): Promise<string[]> {
  if (parser.parseBy === "attrs")
    //если запрашиваем атрибуты элемента
    return element.evaluate((el) => el.getAttributeNames());
  console.error(parser);
  console.error("поле parser.parseBy не установлено");
  return [];
}
