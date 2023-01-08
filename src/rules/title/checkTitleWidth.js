export function checkTitleWidth(html) {
  //Получаем все элементы для проверки
  let titleList = html.querySelectorAll("h1, h2, h3");

  //объект правила с для результатов и ошибок
  let result = {
    rule: "Длина заголовка меньше 70 символов",
    check: true, //по умолчанию проверка верная
    error: [],
  };

  //Проходим по каждому элементу (заголовку)
  titleList.forEach((title) => {
    const length = 70;
    //проверка правила
    const text = title.innerHTML;
    var count = text.length;

    if (count > length) {
      result.check = false;
      result.error.push(title.innerHTML);
    }
  });

  return result;
}
