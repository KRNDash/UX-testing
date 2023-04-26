import { RulesConfig } from "./types/Config";

export const config: RulesConfig[] = [
  {
    id: 1,
    section: "Текст",
    rules: [
      {
        id: 1,
        selector: "p, div, li, span",
        ruleName: "Размер шрифта на ПК от 14px до 24px, целые числа или 330px",
        сheckers: [
          {
            type: "range",
            toBeParsed: "css-property",
            cssProperty: "fontSize",
            range: [14, 24],
          },
          {
            type: "integer",
            toBeParsed: "css-property",
            cssProperty: "fontSize",
          },
          {
            type: "includes",
            toBeParsed: "css-property",
            cssProperty: "fontSize",
            variants: [330],
          },
        ],
      },
      {
        id: 2,
        selector: "p",
        ruleName: "Межстрочное расстоние от 120% до 180% или normal",
        сheckers: [
          {
            type: "range",
            toBeParsed: "css-property",
            cssProperty: "lineHeight",
            range: [120, 180],
          },
          {
            type: "includes",
            toBeParsed: "css-property",
            cssProperty: "lineHeight",
            variants: ["normal"],
          },
        ],
      },
      {
        id: 3,
        selector: "p",
        ruleName: "Межбуквенное расстояние от 0 до 0.4",
        сheckers: [
          {
            type: "range",
            toBeParsed: "css-property",
            cssProperty: "letterSpacing",
            range: [0, 0.4],
          },
        ],
      },
      {
        id: 4,
        selector: "p",
        ruleName: "Текст написан в нижнем регистре (не ЗАГЛАВНЫМИ)",
        сheckers: [
          {
            type: "includes",
            toBeParsed: "css-property",
            cssProperty: "textTransform",
            variants: ["lowercase"],
          },
        ],
      },
      {
        id: 5,
        selector: "p",
        ruleName: "Начертание шрифта light-medium (от 100 до 500)",
        сheckers: [
          {
            type: "range",
            toBeParsed: "css-property",
            cssProperty: "fontWeight",
            range: [100, 500],
          },
          {
            type: "includes",
            toBeParsed: "css-property",
            cssProperty: "fontWeight",
            variants: ["light", "medium"],
          },
        ],
      },
      {
        id: 6,
        selector: "p",
        ruleName:
          "Ширина текстового блока не больше 80 символов и делится на 2 или 3 или 5",
        сheckers: [
          {
            type: "range",
            toBeParsed: "text-content",
            parseBy: "count",
            range: [null, 80],
          },
          {
            type: "multiplicity",
            toBeParsed: "text-content",
            parseBy: "count",
            multiplesOf: [2, 3, 5],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    section: "Заголовки",
    rules: [
      {
        id: 1,
        selector: "h1",
        ruleName: "Единственный H1 на странице",
        сheckers: [
          {
            type: "range",
            toBeParsed: "elements",
            parseBy: "count",
            range: [1, 1],
          },
        ],
      },
      {
        id: 2,
        selector: "h1, h2, h3, h4, h5, h6",
        ruleName: "Наличие текста в заголовках",
        сheckers: [
          {
            type: "range",
            toBeParsed: "text-content",
            parseBy: "count",
            range: [1, null],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    section: "Изображения",
    rules: [
      {
        id: 1,
        selector: "img",
        ruleName: "Картинки должны весить меньше 2мб, в идеале меньше 500кб",
        сheckers: [
          {
            type: "range",
            toBeParsed: "images",
            parseBy: "byteSize",
            range: [null, 2000000],
          },
        ],
      },
      {
        id: 1,
        selector: "img",
        ruleName: "У всех картинок есть alt",
        сheckers: [
          {
            type: "includes",
            toBeParsed: "elements",
            parseBy: "attrs",
            variants: ["alt"],
          },
        ],
      },
    ],
  },
];
