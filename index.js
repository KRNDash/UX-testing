document.querySelector("#test-btn-js").addEventListener("click", function () {
  let doc = document.querySelector(".test_page");
  console.log("Запущено");

  let sizeStart = 32;
  let sizeEnd = 150;

  let rule1 = checkTitleSize(doc, sizeStart, sizeEnd);
  document.getElementById("rule1").checked = rule1;
  console.log(rule1);
});

//1. Размер шрифта Заголовоков (h1-h6) от 32 до 150px

//js doc
/**
 *
 * @param {Element | null} html
 * @param {number} sizeStart
 * @param {number} sizeEnd
 */
function checkTitleSize(html, sizeStart = 32, sizeEnd = 150) {
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
    }
  });
  return result;
}
