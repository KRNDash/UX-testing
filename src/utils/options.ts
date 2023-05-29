import { cssType, typeType } from "./Types";

export const cssPropertyOptions: cssType[] = [
  {
    value: "fontSize",
    label: "Размер шрифта (font-size)",
  },
  {
    value: "fontStyle",
    label: "Стиль начертания шрифта (font-style)",
  },
  {
    value: "fontWeight",
    label: "Насыщенность шрифта (font-weight)",
  },
  {
    value: "color",
    label: "Цвет элемента (color)",
  },
  {
    value: "backgroundColor",
    label: "Цвет фона элемента (background-color)",
  },
  {
    value: "backgroundPosition",
    label: "Начальное положение фонового изображения (background-position)",
  },
  {
    value: "borderWidth",
    label: "Толщина обводки (border-width)",
  },
  {
    value: "borderRadius",
    label: "Скругление границ элемента (border-width)",
  },
  {
    value: "borderColor",
    label: "Цвет обводки (border-color)",
  },
  {
    value: "opacity",
    label: "Прозрачность элемента (opacity)",
  },
  {
    value: "height",
    label: "Высота элемента (height)",
  },
  {
    value: "width",
    label: "Ширина элемента (width)",
  },
  {
    value: "lineHeight",
    label: "Межстрочный интервал текста (line-height)",
  },
  {
    value: "letterSpacing",
    label: "Расстояние между символами (letter-spacing)",
  },
  {
    value: "textAlign",
    label: "Выравнивание текста (text-align)",
  },
  {
    value: "textDecoration",
    label: "Оформление текста (text-decoration)",
  },
  {
    value: "textDecorationColor",
    label: "Устанавливает цвет оформления текста (text-decoration-color)",
  },
  {
    value: "textTransform",
    label: "Устанавливает регистр текста (text-transform)",
  },
];

export const elementPropertyOptions = [
  {
    value: "count",
    label: "Количество элементов на странице",
  },
  {
    value: "attrs",
    label: "Наличие атрибутов у элементов",
  },
];

export const typeOptions: typeType[] = [
  {
    value: "range",
    label: "Диапазон",
  },
  {
    value: "integer",
    label: "Значение является целым",
  },
  {
    value: "includes",
    label: "Строгое равенство",
  },
  {
    value: "multiplicity",
    label: "Кратность числу(ам)",
  },
];

//Тип получаемых данных
export const parseOptions = [
  {
    value: "css-property",
    label: "CSS-свойство",
  },
  {
    value: "text-content",
    label: "Количество символов в тексте",
  },
  {
    value: "elements",
    label: "Свойства элементов (атрибуты)",
  },
];

export const imageOptions = [{ value: "byteSize", label: "Вес изображения" }];
