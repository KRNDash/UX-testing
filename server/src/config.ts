import { RulesConfig } from "./types/Config";

// Текст
//// + Межстрочное расстоние от 120 до 180% или normal
//// + Размер шрифта на ПК от 14 до 24px
//// + Межбуквенное расстояние от 0 до 0.4
//// +- Текст написан в нижнем регистре (не ЗАГЛАВНЫМИ)
//// + Начертание шрифта light-medium (от 100 до 500)
//// + Выравнивание по левому краю, можно и по правому
//// + Никакого выравнивания по ширине
//// + Цвет текста не черный
//// + Ширина текстового блока не больше 80 символов (хз как проверить)

// Заголовок
//// + Длина заголовка меньше 70 символов
//// + Единственный H1 на странице
//// + Размер заголовков кратен 2 и является целым числом
//// + Размер заголовков h1-h3 от 24px до 150px

// Кнопки
//// + Наличие текста кнопки
//// - Отступ от текста кнопки справа и слева не меньше 32px
//// - Отступ от текста кнопки сверху и снизу не меньше 18px
//// + Размер шрифта кнопки 14-16 px для ПК
//// +- Не использовать градиент на кнопках
//// - Сделать цвет кнопки и цвет текста достаточно контрастными
//// + У всех кнопок ЕДИНЫЙ стиль написания (строчные, ЗАГЛАВНЫЕ и т.д.)
//// - Наличие состояний кнопок: action, focused, disabled, hover

// Изображение
//// + Картинки должны весить меньше 2мб, в идеале меньше 500кб
//// - не понял: Изображения не деформируются (cover)
//// + У всех картинок есть alt
//// Размер картинки - целое число

// Формы
//// Наличие подсказок в полях для ввода
//// Разные шрифты
//// Ширина поля для ввода от 150 до 1200px
//// Размер лейблов от 16px до 32px
//// Цвет placeholder серый (прозрачный черный)

export const config: RulesConfig[] = [
  {
    id: 1,
    section: "Текст",
    rules: [
      {
        id: 1,
        selector: ".list-item",
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
          // {
          //   type: "includes",
          //   toBeParsed: "css-property",
          //   cssProperty: "fontSize",
          //   variants: [330],
          // },
        ],
      },
      // {
      //   id: 2,
      //   selector: "p",
      //   ruleName: "Межстрочное расстоние от 120% до 180% или normal",
      //   сheckers: [
      //     {
      //       type: "range",
      //       toBeParsed: "css-property",
      //       cssProperty: "lineHeight",
      //       range: [120, 180],
      //     },
      //     {
      //       type: "includes",
      //       toBeParsed: "css-property",
      //       cssProperty: "lineHeight",
      //       variants: ["normal"],
      //     },
      //   ],
      // },
      // {
      //   id: 3,
      //   selector: "p",
      //   ruleName: "Межбуквенное расстояние от 0 до 0.4",
      //   сheckers: [
      //     {
      //       type: "range",
      //       toBeParsed: "css-property",
      //       cssProperty: "letterSpacing",
      //       range: [0, 0.4],
      //     },
      //   ],
      // },
      // {
      //   id: 4,
      //   selector: "p",
      //   ruleName: "Текст написан в нижнем регистре (не ЗАГЛАВНЫМИ)",
      //   сheckers: [
      //     {
      //       type: "includes",
      //       toBeParsed: "css-property",
      //       cssProperty: "textTransform",
      //       variants: ["lowercase"],
      //     },
      //   ],
      // },
      // {
      //   id: 5,
      //   selector: "p",
      //   ruleName: "Начертание шрифта light-medium (от 100 до 500)",
      //   сheckers: [
      //     {
      //       type: "range",
      //       toBeParsed: "css-property",
      //       cssProperty: "fontWeight",
      //       range: [100, 500],
      //     },
      //     {
      //       type: "includes",
      //       toBeParsed: "css-property",
      //       cssProperty: "fontWeight",
      //       variants: ["light", "medium"],
      //     },
      //   ],
      // },
      // {
      //   id: 6,
      //   selector: "p",
      //   ruleName:
      //     "Ширина текстового блока не больше 80 символов и делится на 2 или 3 или 5",
      //   сheckers: [
      //     {
      //       type: "range",
      //       toBeParsed: "text-content",
      //       parseBy: "count",
      //       range: [null, 80],
      //     },
      //     {
      //       type: "multiplicity",
      //       toBeParsed: "text-content",
      //       parseBy: "count",
      //       multiplesOf: [2, 3, 5],
      //     },
      //   ],
      // },
    ],
  },
  // {
  //   id: 2,
  //   section: "Заголовки",
  //   rules: [
  //     {
  //       id: 1,
  //       selector: "h1",
  //       ruleName: "Единственный H1 на странице",
  //       сheckers: [
  //         {
  //           type: "range",
  //           toBeParsed: "elements",
  //           parseBy: "count",
  //           range: [1, 1],
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       selector: "h1, h2, h3, h4, h5, h6",
  //       ruleName: "Наличие текста в заголовках",
  //       сheckers: [
  //         {
  //           type: "range",
  //           toBeParsed: "text-content",
  //           parseBy: "count",
  //           range: [1, null],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 2,
  //   section: "Изображения",
  //   rules: [
  //     {
  //       id: 1,
  //       selector: "img",
  //       ruleName: "Картинки должны весить меньше 2мб, в идеале меньше 500кб",
  //       сheckers: [
  //         {
  //           type: "range",
  //           toBeParsed: "images",
  //           parseBy: "byteSize",
  //           range: [null, 2000000],
  //         },
  //       ],
  //     },
  //     {
  //       id: 1,
  //       selector: "img",
  //       ruleName: "У всех картинок есть alt",
  //       сheckers: [
  //         {
  //           type: "includes",
  //           toBeParsed: "elements",
  //           parseBy: "attrs",
  //           variants: ["alt"],
  //         },
  //       ],
  //     },
  //   ],
  // },
];
