import "./style.css";
import { printResult } from "./utils/print"; //вывод результатов в таблицу

import { title } from "./rules";
import { text } from "./rules";

//Событие клика по кнопке "Протестировать"
document.querySelector("#test-btn-js").addEventListener("click", function () {
  const iframe = document.querySelector(".test_page iframe"); //получение стилей страницы для проверки

  const innerDoc = iframe.contentDocument
    ? iframe.contentDocument
    : iframe.contentWindow.document;

  const result = {
    title: [],
    text: [],
    buttons: [],
    images: [],
    forms: [],
  }; //массив для результатов

  //TODO:Сделать автоматический запуск правил проверки
  for (const key in title) {
    result.title.push(title[key](innerDoc));
  }

  for (const key in text) {
    result.text.push(text[key](innerDoc));
  }

  //Вывод результатов проверки
  printResult(result);
});
