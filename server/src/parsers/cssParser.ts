import { ElementHandle } from "puppeteer";
import { CssParser } from "../types/Parser";

//Парчер для получения значений css-свойств
export async function cssParser(
  parser: CssParser,
  element: ElementHandle<Element>
): Promise<string | number> {
  //Получаем значение свойства
  const cssProperty = await element.evaluate(
    (el, cssProperty) => window.getComputedStyle(el)[cssProperty],
    parser.cssProperty
  );
  //Если полученное значение является фнкцией или объектом, то с ними мы работать не можем и возвращаем пустую строку
  if (typeof cssProperty === "function") return "";
  if (typeof cssProperty === "object") return "";
  return cssProperty;
}
