import express, { Express, Request, Response } from "express"; //подключение сервера express
import dotenv from "dotenv";
import puppeteer, { Browser } from "puppeteer"; //бибилиотека получения разметки
import path from "path";
import { config } from "./config"; //конфиг правил
import { getCheckResult } from "./checkers"; //чекеры
import { CheckResult } from "./types/Checker"; //типы чекеров
import { RulesConfig } from "./types/Config"; //тип конфиг
import { isValidUrl } from "./utils/isValidUrl"; //проверка валидности адреса
import { createServer as createViteServer } from "vite";

dotenv.config();

//Инициализация express
const app: Express = express();
//Используем статическую папку
app.use(express.static(path.join(__dirname, "public")));

//открывается через порт 3000
const port = process.env.PORT || 3000;
let browser: Browser | null = null;

//Где принимаем запрос
//Request - запрос к серверу
//Response - ответ от сервера
app.get("/api/check", async (req: Request, res: Response) => {
  const url = String(req.query.url);
  // TODO: isValidUrl работает не очень хорошо
  // if (!isValidUrl(String(url)))
  //   return res.json({ error: "URL не валиден", value: url }).status(400);

  //Что будем получать
  if (!browser) return res.json({ message: "Повторите попытку позднее" });

  //Создаем новую страницу в Puppeeter
  const page = await browser.newPage();

  try {
    //Переменная для хранения результатов тестирования
    const results: RulesConfig<CheckResult[]>[] = [];

    //Проходимся по конфигу правил
    for (const [sectionIndex, ruleSection] of config.entries()) {
      //1 уровень списка правил
      results.push({ ...ruleSection, rules: [] });

      //2 уровень списка правил
      for (const [ruleIndex, rule] of ruleSection.rules.entries()) {
        results[sectionIndex].rules.push({ ...rule, сheckers: [] });

        const [goto] = await Promise.allSettled([
          //Переход на введенный URL
          page.goto(url, { timeout: 0 }),
          //Ищем на странице указанные в правиле селекторы
          page.waitForSelector(rule.selector, { timeout: 10000 }),
        ]);
        if (goto.status === "rejected") throw new Error(goto.reason);

        //Получаем указанный в правиле селектор(ы)
        const elements = await page.$$(rule.selector);

        //Проходимся по всем проверкам каждого правила (диапазон, включение, кратность и целочисленность)
        for (const checker of rule.сheckers) {
          const checkResult = await getCheckResult(page, elements, checker);
          results[sectionIndex].rules[ruleIndex].сheckers.push(checkResult);
        }
      }
    }
    //Отправляем результаты проверки
    res.json(results);
  } catch (error) {
    //В случае ошибки сервер отправит текст ошибки и статус 400
    res.json({ message: "Ошибка: " + String(error) }).status(400);
  } finally {
    //Закрываем доступ к странице puppeteer
    await page.close();
  }
});

async function start() {
  try {
    browser = await puppeteer.launch();
    //Через какой порт прослушиваем
    const server = app.listen(port, () =>
      console.log(`Server starts at http://localhost:${port}`)
    );

    server.on("close", () => browser?.close());
  } catch (error) {
    console.error(error);
  }
}

start();
