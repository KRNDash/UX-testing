import { Page, ElementHandle } from "puppeteer";
import { parseElements } from "../parsers";
import { Checker, CheckResult } from "../types/Checker";
import { includesChecker } from "./includesChecker";
import { integerChecker } from "./integerChecker";
import { multiplicityChecker } from "./multiplicityChecker";
import { rangeChecker } from "./rangeChecker";

export async function getCheckResult(
  page: Page,
  elementList: ElementHandle<Element>[],
  checker: Checker
) {
  const parsedElements = await parseElements(page, elementList, checker);
  const result: CheckResult[] = [];

  for (const elementValue of parsedElements) {
    try {
      if (checker.type === "range") {
        result.push(rangeChecker(elementValue, checker));
      }

      if (checker.type === "includes") {
        result.push(includesChecker(elementValue, checker));
      }

      if (checker.type === "integer") {
        result.push(integerChecker(elementValue, checker));
      }

      if (checker.type === "multiplicity") {
        result.push(multiplicityChecker(elementValue, checker));
      }
      console.log(result);
    } catch (error) {
      if (error instanceof CheckResult) result.push(error);
      else console.error(error);
    }
  }

  return result;
}
