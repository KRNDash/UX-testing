export function checkTitleCount(html) {
  //Получаем все элементы для проверки
  let titleList = html.querySelectorAll("h1");

  //объект правила с для результатов и ошибок
  let result = {
    rule: "Единственный H1 на странице",
    check: true, //по умолчанию проверка верная
    error: [],
  };

  if (titleList.length > 1) {
    result.check = false;

    for (let i = 0; i < titleList.length; i++) {
      result.error.push(titleList[i].innerHTML);
    }
  }

  return result;
}
