export function checkTextWeight(html) {
  //Получаем все элементы для проверки
  let textList = html.querySelectorAll("p");

  //объект правила с для результатов и ошибок
  let result = {
    rule: "Начертание шрифта light-medium (от 100 до 500)",
    check: true, //по умолчанию проверка верная
    error: [],
  };

  const weightStart = 100;
  const weightEnd = 500;

  // Проходим по каждому элементу (заголовку)
  textList.forEach((text) => {
    //проверка правила
    let style = window
      .getComputedStyle(text, null)
      .getPropertyValue("font-weight");

    if (
      parseInt(style) < weightStart ||
      parseInt(style) > parseInt(weightEnd)
    ) {
      if (style === "normal") {
        result.check = true;
      } else {
        result.check = false;
        result.error.push(text.innerHTML);
      }
    }
  });

  return result;
}
