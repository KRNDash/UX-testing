import { ElementHandle } from "puppeteer";
import { TextParser } from "../types/Parser";

//Получение текста
export async function textParser(
  parser: TextParser,
  element: ElementHandle<Element>
): Promise<number> {
  //получаем текст элемента
  const textContent = await element.evaluate((el) => el.textContent);
  //если нужен подсчет количества символов
  if (parser.parseBy === "count") return textContent?.length || 0;
  console.error(parser);
  console.error("поле parser.parseBy не установлено");
  return 0;
}
