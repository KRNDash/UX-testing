import { RangeChecker, CheckResult } from "../types/Checker";
import { ParserReturn } from "../types/Parser";
import { Range } from "../types/Range";

//Проверка на попадание свойства элемента в диапазон значений, указанный в правиле
//Например, размер текста от 14 до 24 пикселей
function inRange(range: Range, value: number): boolean {
  if (range[0] === null && range[1] !== null) return value <= range[1];
  if (range[0] !== null && range[1] === null) return value >= range[0];
  if (range[0] !== null && range[1] !== null)
    return value >= range[0] && value <= range[1];
  return true;
}

//Проверка на попадание в диапазон значений (больше или равно, меньше или равно)
export function rangeChecker(
  //Результат от парсера
  value: ParserReturn,
  //Тип чекера - диапазон
  checker: RangeChecker
): CheckResult {
  //Результат проверки
  //Если тип значения из парсера строка, то конвертируем его в число
  if (typeof value === "string") {
    const parsedValue = parseFloat(value);
    //Если конвертация не удалась, то мы берем длину строки
    //Иначе берем конвертированное значение
    if (isNaN(parsedValue)) value = value.length;
    else value = parsedValue;
  } else if (Array.isArray(value)) value = value.length;
  return new CheckResult(checker, value, inRange(checker.range, value));
}
