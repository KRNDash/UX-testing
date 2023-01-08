export function checkTextSize(html) {
  //Получаем все элементы для проверки
  let textList = html.querySelectorAll("p");

  //объект правила с для результатов и ошибок
  let result = {
    rule: "Размер шрифта на ПК от 14 до 24px",
    check: true, //по умолчанию проверка верная
    error: [],
  };

  let sizeEnd = 14;
  let sizeStart = 24;

  //Проходим по каждому элементу (заголовку)
  textList.forEach((text) => {
    //проверка правила
    let style = parseInt(
      window.getComputedStyle(text, null).getPropertyValue("font-size")
    );

    if (style < sizeStart || style > sizeEnd) {
      result.check = false;
      var trimmedString = text.innerHTML.substring(0, 50) + "...";
      result.error.push(trimmedString);
    }
  });
  return result;
}
