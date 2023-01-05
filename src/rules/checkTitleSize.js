/**
 * @param {Element | null} html
 * @param {number} sizeStart
 * @param {number} sizeEnd
 */
export function checkTitleSize(html, sizeStart = 32, sizeEnd = 150) {
  //Получаем все элементы для проверки
  let titleList = html.querySelectorAll("h1, h2, h3, h4, h5, h6");
  let result = true;

  //Проходим по каждому элементу (заголовку)
  titleList.forEach((title) => {
    //проверка правила
    let style = parseInt(
      window.getComputedStyle(title, null).getPropertyValue("font-size")
    );
    console.log(style);

    if (style < sizeStart || style > sizeEnd) {
      result = false;
      console.log(title.outerHTML);
    }
  });
  return result;
}
