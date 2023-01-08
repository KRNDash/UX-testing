//Вывод результатов проверки в таблицу
export function printResult(result) {
  document.querySelector(".table-container").innerHTML = ``;

  printTable(result.title, "Заголовки");
  printTable(result.text, "Текст");
  printTable(result.buttons, "Кнопки");
  printTable(result.images, "Изображения");
  printTable(result.forms, "Формы");
}

function printTable(result, title) {
  document.querySelector(".table-container").insertAdjacentHTML(
    "beforeend",
    `
    <h3 class='text_h3 col-8'>
      ${title}
    </h3>
    <table class="table">
      <thead>
          <tr>
              <th scope="col">Правило</th>
              <th scope="col">Результат</th>
          </tr>
      </thead>
      <tbody>
      ${result
        .map(
          (res) =>
            `<tr>
          <td>${res.rule}</td>
          <td><input type="checkbox" id="rule1" name="rule1" ${
            res.check ? "checked" : ""
          } disabled /></td>
        </tr>
        ${
          res.check
            ? ``
            : `<tr>
        <td colspan="2" class='td_error'><strong>Элементы не удовлетворяющие правилу</strong>: ${res.error}</td>
      </tr>`
        }
      `
        )
        .join(" ")}
      </tbody>
    </table>`
  );
}
