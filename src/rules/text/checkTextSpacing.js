export function checkTextSpacing(html) {
  //Получаем все элементы для проверки
  let textList = html.querySelectorAll("p");

  //объект правила с для результатов и ошибок
  let result = {
    rule: "Межбуквенное расстояние от 0 до 0.4",
    check: true, //по умолчанию проверка верная
    error: [],
  };

  // Проходим по каждому элементу (заголовку)
  textList.forEach((text) => {
    //проверка правила
    let style = window
      .getComputedStyle(text, null)
      .getPropertyValue("letter-spacing");

    if (style !== "normal" || parseInt(style) < 0 || parseInt(style) > 0.4) {
      result.check = false;
      result.error.push(text.innerHTML);
    }
  });

  return result;
}
