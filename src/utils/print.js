//Вывод результатов проверки в таблицу
export function printResult(result) {
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
      <tr>
        <td colspan="2" class='td_error'>вотыфтволфытволфытволфтволытолфыотлвлотфволтфытолв вотыфтволфытволфытволфтволытолфыотлвлотфволтфытолв вотыфтволфытволфытволфтволытолфыотлвлотфволтфытолв вотыфтволфытволфытволфтволытолфыотлвлотфволтфытолв вотыфтволфытволфытволфтволытолфыотлвлотфволтфытолв</td>
      </tr>
    `.trim()
    )}
    </tbody>`.trim();
}
