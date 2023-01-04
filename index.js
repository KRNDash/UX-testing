document.querySelector("#test-btn-js").addEventListener("click", function () {
  const iframe = document.querySelector(".test_page iframe");
  const innerDoc = iframe.contentDocument
    ? iframe.contentDocument
    : iframe.contentWindow.document;

  const sizeStart = 32;
  const sizeEnd = 150;

  const result = [];

  const rule1 = checkTitleSize(innerDoc, sizeStart, sizeEnd);
  result.push({
    rule: "Размер шрифта Заголовоков (h1-h6) от 32 до 190px",
    result: `<input type="checkbox" id="rule1" name="rule1" ${
      rule1 ? "checked" : ""
    } disabled />`,
  });

  printResult(result);
});

import config from "./rules.json";

const configObject = JSON.parse(config);
configObject.forEach((rule) => {
  const element = document.querySelectorAll(rule.selector);
  window.getComputedStyle(rule.valueToCheck);
});
//js doc
/**
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
      console.log(title.outerHTML);
    }
  });
  return result;
}

//
//
//Вывод результатов проверки в таблицу
function printResult(result) {
  document.querySelector(".table").innerHTML = `
  <thead>
      <tr>
          <th scope="col">Критерий</th>
          <th scope="col">Результат</th>
      </tr>
  </thead>
  <tbody>
  ${result.map((res) =>
    `
    <tr>
      <td>${res.rule}</td>
      <td>${res.result}</td>
    </tr>
  `.trim()
  )}
  </tbody>`.trim();
}
