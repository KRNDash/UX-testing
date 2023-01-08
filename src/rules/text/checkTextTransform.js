export function checkTextTransform(html) {
  //Получаем все элементы для проверки
  let textList = html.querySelectorAll("p");

  //объект правила с для результатов и ошибок
  let result = {
    rule: "Текст написан в нижнем регистре (не ЗАГЛАВНЫМИ)",
    check: true, //по умолчанию проверка верная
    error: [],
  };

  // Проходим по каждому элементу (заголовку)
  textList.forEach((text) => {
    //проверка правила
    let style = parseFloat(
      window.getComputedStyle(text, null).getPropertyValue("text-transform")
    );

    if (style === "uppercase") {
      result.check = false;
      result.error.push(text.innerHTML);
    }
  });

  return result;
}
