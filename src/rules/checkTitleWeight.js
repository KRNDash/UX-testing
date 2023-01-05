/**
 * @param {Element | null} html
 * @param {number} sizeStart
 * @param {number} sizeEnd
 */
export function checkTitleWeight(html) {
  //Получаем все элементы для проверки
  let titleList = html.querySelectorAll("h1, h2, h3");

  //объект правила с для результатов и ошибок
  let result = {
    rule: "Начертание заголовков жирное или средне-жирное (font-weight от 600)",
    check: true, //по умолчанию проверка верная
    error: [],
  };

  let weightStart = 600;

  //Проходим по каждому элементу (заголовку)
  titleList.forEach((title) => {
    //проверка правила
    let style = parseInt(
      window.getComputedStyle(title, null).getPropertyValue("font-weight")
    );

    if (
      style < weightStart ||
      style == "light" ||
      style == "normal" ||
      style == "lighter"
    ) {
      result.check = false;
      result.error.push(String(title.outerHTML));
    }
  });
  return result;
}
