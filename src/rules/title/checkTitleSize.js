export function checkTitleSize(html) {
  //Получаем все элементы для проверки
  let titleList = html.querySelectorAll("h1, h2, h3");

  //объект правила с для результатов и ошибок
  let result = {
    rule: "Размер заголовков h1-h3 от 24px до 150px",
    check: true, //по умолчанию проверка верная
    error: [],
  };

  let sizeEnd = 150;
  let sizeStart = 32;

  //Проходим по каждому элементу (заголовку)
  titleList.forEach((title) => {
    //проверка правила
    let style = parseInt(
      window.getComputedStyle(title, null).getPropertyValue("font-size")
    );

    if (style < sizeStart || style > sizeEnd) {
      result.check = false;
      result.error.push(title.innerHTML);
    }
  });
  return result;
}
