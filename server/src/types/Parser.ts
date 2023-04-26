import { cssParser } from "../parsers/cssParser";
import { elementsParser } from "../parsers/elementsParser";
import { imageParser } from "../parsers/imageParser";
import { textParser } from "../parsers/textParser";

//Здесь указываются виды получаемых объектов и методы, которые будут их обрабатывать

//Получение css свойства
export type CssParser = {
  toBeParsed: "css-property"; //что получаем (css-свойство)
  cssProperty: keyof CSSStyleDeclaration; //объект, который возвращается, когда мы хотим получить значение стиля из JS
};

//Получение текста (контента)
export type TextParser = {
  toBeParsed: "text-content"; //что получаем (текст внутри элемента)
  parseBy: "count"; //проверка на количество (символов)
};

//Получение элементов
export type ElementsParser = {
  toBeParsed: "elements";
  parseBy: "count" | "attrs"; //проверка на количество (элементов) или проверка атрибутов (alt)
};

//Получение картинок
export type ImageParser = {
  toBeParsed: "images";
  parseBy: "byteSize"; //проверка на вес изображения
};

//Парсеры 4 типов: текст, css, элементы, картинки
export type Parser = CssParser | TextParser | ElementsParser | ImageParser;

export type CssParserReturn = Awaited<ReturnType<typeof cssParser>>;
export type ElementsParserReturn = Awaited<ReturnType<typeof elementsParser>>;
export type ImageParserReturn = Awaited<ReturnType<typeof imageParser>>;
export type TextParserReturn = Awaited<ReturnType<typeof textParser>>;

export type ParserReturn =
  | CssParserReturn
  | TextParserReturn
  | ImageParserReturn
  | ElementsParserReturn;
