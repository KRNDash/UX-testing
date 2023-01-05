import "./style.css";
import { checkTitleSize } from "./rules/checkTitleSize"; //правило проверки
import { checkTitleWeight } from "./rules/checkTitleWeight"; //правило проверки
import { printResult } from "./utils/print"; //вывод результатов в таблицу
import config from "./config.json"; //правила

//Событие клика по кнопке "Протестировать"
document.querySelector("#test-btn-js").addEventListener("click", function () {
  // console.log(config);

  const iframe = document.querySelector(".test_page iframe"); //получение стилей страницы для проверки

  const innerDoc = iframe.contentDocument
    ? iframe.contentDocument
    : iframe.contentWindow.document;

  let result = [];
  //TODO:Сделать запуск правил проверки
  let res;

  res = checkTitleSize(innerDoc);
  result.push(res);

  res = checkTitleWeight(innerDoc);
  result.push(res);

  printResult(result);
});
