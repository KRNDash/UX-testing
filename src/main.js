import "./style.css";
import { printResult } from "./utils/print"; //вывод результатов в таблицу
import config from "./config.json";

//Правила
import { checkTitleSize } from "./rules/checkTitleSize";
import { checkTitleWeight } from "./rules/checkTitleWeight";
import { checkTitleMultiplicity } from "./rules/checkTitleMultiplicity";
import { checkTitleCount } from "./rules/checkTitleCount";
import { checkTitleWidth } from "./rules/checkTitleWidth";

//Событие клика по кнопке "Протестировать"
document.querySelector("#test-btn-js").addEventListener("click", function () {
  // console.log(config);

  const iframe = document.querySelector(".test_page iframe"); //получение стилей страницы для проверки

  const innerDoc = iframe.contentDocument
    ? iframe.contentDocument
    : iframe.contentWindow.document;

  const result = []; //массив для результатов

  //TODO:Сделать автоматический запуск правил проверки
  result.push(checkTitleSize(innerDoc));
  result.push(checkTitleWeight(innerDoc));
  result.push(checkTitleMultiplicity(innerDoc));
  result.push(checkTitleCount(innerDoc));
  result.push(checkTitleWidth(innerDoc));

  //Вывод результатов проверки
  printResult(result);
});
