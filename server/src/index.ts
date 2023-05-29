import express, { Express, Request, Response } from "express"; //подключение сервера express
import dotenv from "dotenv";
import cors from "cors";
import puppeteer, { Browser } from "puppeteer"; //бибилиотека получения разметки
import path from "path";
import { config } from "./config"; //конфиг правил
import { getCheckResult } from "./checkers"; //чекеры
import { CheckResult } from "./types/Checker"; //типы чекеров
import { RulesConfig } from "./types/Config"; //тип конфиг
// import { isValidUrl } from "./utils/isValidUrl"; //проверка валидности адреса

dotenv.config();

//Инициализация express
const app: Express = express();

//Используем статическую папку
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//открывается через порт 3000
const port = process.env.PORT || 3000;
let browser: Browser | null = null;

//Где принимаем запрос
//Request - запрос к серверу
//Response - ответ от сервера
app.post("/api/check", async (req: Request, res: Response) => {
  //Получаем адрес страницы с запроса
  const url = String(req.query.url);

  //Получаем конфиг с запроса
  const newConfig: RulesConfig[] = req.body;
  let conf;

  // console.log(newConfig);

  //Что будем получать
  if (!browser) return res.json({ message: "Повторите попытку позднее" });

  //Создаем новую страницу в Puppeeter
  const page = await browser.newPage();

  try {
    if (!newConfig) {
      conf = config.entries();
    } else {
      conf = newConfig.entries();
    }

    //Переменная для хранения результатов тестирования
    const results: RulesConfig<CheckResult[]>[] = [];
    //Проходимся по конфигу правил ()
    for (const [sectionIndex, ruleSection] of conf) {
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
    console.log(error);
    res.status(400).json({ message: "Ошибка: " + String(error) });
  } finally {
    //Закрываем доступ к странице puppeteer
    await page.close();
  }
});

//Получаем исходный конфиг (без результатов тестирования)
app.get("/api", async (req: Request, res: Response) => {
  // const url = String(req.query.url);

  //Что будем получать
  if (!browser) return res.json({ message: "Повторите попытку позднее" });

  try {
    //Отправляем результаты проверки
    res.json(config);
  } catch (error) {
    //В случае ошибки сервер отправит текст ошибки и статус 400
    res.json({ message: "Ошибка: " + String(error) }).status(400);
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
