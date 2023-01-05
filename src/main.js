import "./style.css";
import { checkTitleSize } from "./rules/checkTitleSize";
import { printResult } from "./utils/print";
import config from "./config.json";

document.querySelector("#test-btn-js").addEventListener("click", function () {
  // console.log(config);

  const iframe = document.querySelector(".test_page iframe");
  const innerDoc = iframe.contentDocument
    ? iframe.contentDocument
    : iframe.contentWindow.document;

  for (const rule of config) {
    const elements = innerDoc.querySelectorAll(rule.selector);
    const result = [];
    elements.forEach((el) => {
      let value = undefined;
      if (rule.valueToCheck === "content") {
        value = el.textContent;
      } else value = window.getComputedStyle(el)[rule.valueToCheck];

      switch (rule.rule.type) {
        case "range":
          result.push(
            parseInt(value) >= rule.rule.from && parseInt(value) <= rule.rule.to
          );
          break;
        case "multipleOf":
          result.push(parseInt(value) % rule.rule.value === 0);
          break;
        default:
          break;
      }
    });

    console.log(rule.rule);
    console.log(result);
  }
  // const sizeStart = 32;
  // const sizeEnd = 150;

  // const result = [];

  // const rule1 = checkTitleSize(innerDoc, sizeStart, sizeEnd);
  // result.push({
  //   rule: "Размер шрифта Заголовоков (h1-h6) от 32 до 190px",
  //   result: `<input type="checkbox" id="rule1" name="rule1" ${
  //     rule1 ? "checked" : ""
  //   } disabled />`,
  // });

  // printResult(result);
});

printResult([{ rule: "123", result: "123" }]);
