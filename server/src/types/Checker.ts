import { Parser, ParserReturn } from "./Parser";
import { Range } from "./Range";

//Попадание в диапазон значений
export type RangeChecker = Parser & {
  type: "range";
  range: Range;
};

export type IncludesVariant = string | number;

//Содержит значение (числовые или строковые)
export type IncludesChecker = Parser & {
  type: "includes";
  variants: IncludesVariant[]; //массив значений, одному из которых должен равняться проверяемый элемент
  strict?: boolean;
};

//Целочисленный чекер (проверка на целостность числа)
export type IntegerChecker = Parser & {
  type: "integer";
};

//Делимость на...(кратность)
export type MultiplicityChecker = Parser & {
  type: "multiplicity";
  multiplesOf: number[]; //массив чисел, которым должно быть кратно свойство элемента (или количество элементов)
};

// Тип Чекер. Может принимать следующие типа: содержит значение, диапазон, делимость на...(кратность), целочисленный чекер
export type Checker =
  | IncludesChecker
  | RangeChecker
  | MultiplicityChecker
  | IntegerChecker;

//Класс Результата проверки
//Содержит поля: проверщик (чекер), значение свойства с разметки, результат проверки (да/нет), результат текстом (ошибки или другое)
export class CheckResult {
  checker: Checker;
  value: ParserReturn;
  result: boolean;
  resultText?: string;

  constructor(
    checker: Checker,
    value: ParserReturn,
    result: boolean,
    resultText?: string
  ) {
    this.checker = checker;
    this.value = value;
    this.result = result;
    this.resultText = resultText;
  }
}
