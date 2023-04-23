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

const config = [
  {
    id: 1,
    section: "Текст",
    selector: "p",
    rules: [
      {
        id: 1,
        ruleName: "Размер шрифта на ПК от 14 до 24px",
        type: "compare",
        property: "font-size",
        range: [14, 24],
      },
      {
        id: 2,
        ruleName: "Межстрочное расстоние от 120% до 180% или normal",
        type: "compare",
        property: "line-height",
        range: [120, 180],
        variants: ["normal"],
      },
      {
        id: 3,
        ruleName: "Межбуквенное расстояние от 0 до 0.4",
        type: "compare",
        property: "letter-spacing",
        range: [0, 0.4],
      },
      {
        // в css свойсте может быть "unset" / "initial" и т.д., при этом сам текст написан в нижнем регистре, это надо обработать
        id: 4,
        ruleName: "Текст написан в нижнем регистре (не ЗАГЛАВНЫМИ)",
        type: "compare",
        property: "text-transform",
        variants: ["lowercase", "initial", "unset"],
      },
      {
        id: 5,
        ruleName: "Начертание шрифта light-medium (от 100 до 500)",
        type: "compare",
        property: "font-weight",
        range: [100, 500],
        variants: ["light", "medium"],
      },
      {
        id: 6,
        ruleName: "Выравнивание по левому краю, можно и по правому",
        type: "compare",
        property: "text-align",
        variants: ["left", "right"],
      },
      {
        id: 7,
        ruleName: "Ширина текстового блока не больше 80 символов",
        type: "count",
        property: "text-length", // уникальное свойство
        range: [0, 80],
      },
    ],
  },
  {
    id: 2,
    section: "Заголовок",
    selector: "h1, h2, h3, h4, h5, h6",
    rules: [
      {
        id: 1,
        ruleName: "Длина заголовка меньше 70 символов",
        type: "count",
        property: "text-length", // уникальное свойство
        // наверное надо сделать возможным указать null для одного из значений range
        range: [70, null],
      },
      {
        id: 2,
        ruleName: "Размер заголовков является целым числом",
        type: "integrity",
        property: "font-size",
      },
      {
        id: 3,
        ruleName: "Размер заголовков кратен 2",
        type: "multiplicity",
        property: "font-size",
        variants: [2],
      },
    ],
  },
  {
    id: 3,
    section: "Заголовок",
    selector: "h1",
    rules: [
      {
        id: 1,
        ruleName: "Единственный H1 на странице",
        type: "count",
        variants: [1],
      },
    ],
  },
  {
    id: 4,
    section: "Заголовок",
    selector: "h1, h2, h3",
    rules: [
      {
        id: 1,
        ruleName: "Размер заголовков h1-h3 от 24px до 150px",
        type: "compare",
        property: "font-size",
        range: [24, 150],
      },
    ],
  },
  {
    id: 5,
    section: "Кнопки",
    selector: "button",
    rules: [
      {
        id: 1,
        ruleName: "Наличие текста кнопки",
        type: "count",
        range: [1, null],
      },
      {
        id: 2,
        ruleName: "Размер шрифта кнопки 14-16 px для ПК",
        type: "compare",
        property: "font-size",
        range: [14, 16],
      },
      {
        id: 3,
        ruleName: "Не использовать градиент на кнопках",
        type: "compare",
        property: "linear-gradient",
        variants: ["initial", "unset", null], // хз
      },
      {
        id: 4,
        ruleName:
          "У всех кнопок ЕДИНЫЙ стиль написания (строчные, ЗАГЛАВНЫЕ и т.д.)",
        type: "compare",
        property: "text-transform",
        // если надо чтобы все элементы имели ОДНО из значений variants, можно указать strict: true и вместо массива объект, в которм есть свойство arr
        variants: {
          strict: true,
          arr: ["lowercase", "uppercase"],
        },
      },
    ],
  },
  {
    id: 6,
    section: "Изображение",
    selector: "img",
    rules: [
      {
        id: 1,
        ruleName: "Картинки должны весить меньше 2мб, в идеале меньше 500кб",
        type: "imageSize", // уникальное свойство
        // в байтах наверное хз
        range: [500, 2000000],
      },
      {
        id: 2,
        ruleName: "У всех картинок есть alt",
        type: "checkAttr", // уникальное свойство
        attrs: ["alt"],
      },
    ],
  },
];

module.exports = config;
