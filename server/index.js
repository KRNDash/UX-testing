const puppeteer = require("puppeteer");
const path = require("path");
const express = require("express");
const config = require("./test-config.js");

const app = express();

function isValidUrl(url) {
  const objRE = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;
  return objRE.test(url);
}

function checkTitleSize(titleList) {
  //объект правила с для результатов и ошибок
  let result = {
    rule: "Размер заголовков h1-h3 от 24px до 150px",
    check: true, //по умолчанию проверка верная
    error: [],
  };

  let sizeEnd = 150;
  let sizeStart = 32;

  //Проходим по каждому элементу (заголовку)
  titleList.forEach((title) => {
    //проверка правила
    let style = parseInt(
      window.getComputedStyle(title, null).getPropertyValue("font-size")
    );

    if (style < sizeStart || style > sizeEnd) {
      result.check = false;
      result.error.push(title.innerHTML);
    }
  });
  return result;
}

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/check", async (req, res) => {
  const url = req.query.url;
  if (!isValidUrl(url))
    return res.json({ error: "URL не валиден", value: url }).status(400);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const divElements = await page.$$("div");
  const htmlElements = await page.evaluate(
    (elements) => elements.map((el) => el),
    ...divElements
  );

  console.log(htmlElements);

  // for (const el of elements) {
  //   const fontSize = await el.evaluate((el) => el.);
  //   arr.push(textContent.trim().replace("\t", ""));
  // }
  // for (const section of config) {
  //   const elements = await page.$$("div");

  //   // правила
  //   for (const rule of section.rules) {
  //     if (rule.type === "compare") {
  //       // если уникальное значение property, то делаем что то уникальное, иначе берем css свойство
  //       // if (rule.property === 'text-length') {
  //       //   callUniqueFunction()
  //       // } else { css свойство }
  //     }
  //   }
  //   // правила
  // }

  await browser.close();

  res.send({});
});

app.listen(3333, () => {
  console.log("Application listening on port 3333!");
});
