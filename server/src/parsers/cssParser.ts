import { ElementHandle } from "puppeteer";
import { CssParser } from "../types/Parser";

export async function cssParser(
  parser: CssParser,
  element: ElementHandle<Element>
): Promise<string | number> {
  const cssProperty = await element.evaluate(
    (el, cssProperty) => window.getComputedStyle(el)[cssProperty],
    parser.cssProperty
  );
  if (typeof cssProperty === "function") return "";
  if (typeof cssProperty === "object") return "";
  return cssProperty;
}
