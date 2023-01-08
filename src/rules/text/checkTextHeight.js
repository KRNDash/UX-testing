export function checkTextHeight(html) {
  //Получаем все элементы для проверки
  let textList = html.querySelectorAll("p");

  //объект правила с для результатов и ошибок
  let result = {
    rule: "Межстрочное расстоние от 120 до 180% или normal",
    check: true, //по умолчанию проверка верная
    error: [],
  };

  // Проходим по каждому элементу (заголовку)
  textList.forEach((text) => {
    //проверка правила
    let style = window
      .getComputedStyle(text, null)
      .getPropertyValue("line-height");

    if (style !== "normal" || parseInt(style) < 120 || parseInt(style) > 180) {
      result.check = false;
      result.error.push(text.innerHTML);
    }
  });

  return result;
}
