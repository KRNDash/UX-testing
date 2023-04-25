import { ElementHandle } from "puppeteer";
import { TextParser } from "../types/Parser";

export async function textParser(
  parser: TextParser,
  element: ElementHandle<Element>
): Promise<number> {
  const textContent = await element.evaluate((el) => el.textContent);
  if (parser.parseBy === "count") return textContent?.length || 0;
  console.error(parser);
  console.error("поле parser.parseBy не установлено");
  return 0;
}
