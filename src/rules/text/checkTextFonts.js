import { getUnique } from "../../utils/getUnique";

export function checkTextFonts(html) {
  //Получаем все элементы для проверки
  let textList = html.querySelectorAll("h1, h2, h3, h4, h5, h6, p");

  //объект правила с для результатов и ошибок
  let result = {
    rule: "Не больше 2 шрифтов на странице",
    check: true, //по умолчанию проверка верная
    error: [],
  };

  let styleList = [];

  // Проходим по каждому элементу (заголовку)
  textList.forEach((text) => {
    //проверка правила
    styleList.push(
      window.getComputedStyle(text, null).getPropertyValue("font-family")
    );
  });

  if (getUnique(styleList) >= 3) {
    result.check = false;
  }

  if (!result.check) {
    result.error =
      "На странице использовано " + getUnique(styleList) + " шрифта";
  }
  return result;
}
