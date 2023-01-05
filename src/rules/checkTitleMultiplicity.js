export function checkTitleMultiplicity(html) {
  //Получаем все элементы для проверки
  let titleList = html.querySelectorAll("h1, h2, h3, h4, h5, h6");

  //объект правила с для результатов и ошибок
  let result = {
    rule: "Размер заголовков кратен 2 и является целым числом",
    check: true, //по умолчанию проверка верная
    error: [],
  };

  //Проходим по каждому элементу (заголовку)
  titleList.forEach((title) => {
    //проверка правила
    let style = parseFloat(
      window.getComputedStyle(title, null).getPropertyValue("font-size")
    );

    if (style % 2 != 0 || style % 1 != 0) {
      result.check = false;
      result.error.push(title.innerHTML);
    }
  });
  return result;
}
