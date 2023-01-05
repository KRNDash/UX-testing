//Вывод результатов проверки в таблицу
export function printResult(result) {
  document.querySelector(".table").innerHTML = `
    <thead>
        <tr>
            <th scope="col">Правило</th>
            <th scope="col">Результат</th>
        </tr>
    </thead>
    <tbody>
    ${result.map(
      (res) =>
        `
      <tr>
        <td>${res.rule}</td>
        <td><input type="checkbox" id="rule1" name="rule1" ${
          res.check ? "checked" : ""
        } disabled /></td>
      </tr>
      ${
        res.check
          ? ``
          : `<tr>
      <td colspan="2" class='td_error'>Элементы не удовлетворяющие правилу: ${res.error}</td>
    </tr>`
      }
      
    `
    )}
    </tbody>`;
}
