import { Page, ElementHandle } from "puppeteer";
import { parseElements } from "../parsers";
import { Checker, CheckResult } from "../types/Checker";
import { includesChecker } from "./includesChecker";
import { integerChecker } from "./integerChecker";
import { multiplicityChecker } from "./multiplicityChecker";
import { rangeChecker } from "./rangeChecker";

//Получение результатов проверки
export async function getCheckResult(
  page: Page,
  elementList: ElementHandle<Element>[],
  checker: Checker
) {
  //Полученные элементы
  const parsedElements = await parseElements(page, elementList, checker);
  //Массив результатов
  const result: CheckResult[] = [];

  //Проходимся по всем элементам, полученным со страницы
  for (const elementValue of parsedElements) {
    try {
      //Проверка на диапазон
      if (checker.type === "range") {
        result.push(rangeChecker(elementValue, checker));
      }
      //Проверка на включение
      if (checker.type === "includes") {
        result.push(includesChecker(elementValue, checker));
      }
      //Проверка на целочисленность
      if (checker.type === "integer") {
        result.push(integerChecker(elementValue, checker));
      }
      //Проверка на кратность
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
