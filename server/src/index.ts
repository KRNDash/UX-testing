import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import puppeteer, { Browser } from "puppeteer";
import path from "path";
import { config } from "./config";
import { getCheckResult } from "./checkers";
import { CheckResult } from "./types/Checker";
import { RulesConfig } from "./types/Config";
import { isValidUrl } from "./utils/isValidUrl";

dotenv.config();

const app: Express = express();
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 3000;
let browser: Browser | null = null;

app.get("/api/check", async (req: Request, res: Response) => {
  const url = String(req.query.url);
  // TODO: isValidUrl работает не очень хорошо
  // if (!isValidUrl(String(url)))
  //   return res.json({ error: "URL не валиден", value: url }).status(400);

  if (!browser) return res.json({ message: "Повторите попытку позднее" });
  const page = await browser.newPage();
  try {
    const results: RulesConfig<CheckResult[]>[] = [];
    for (const [sectionIndex, ruleSection] of config.entries()) {
      results.push({ ...ruleSection, rules: [] });
      for (const [ruleIndex, rule] of ruleSection.rules.entries()) {
        results[sectionIndex].rules.push({ ...rule, сheckers: [] });

        const [goto] = await Promise.allSettled([
          page.goto(url, { timeout: 0 }),
          page.waitForSelector(rule.selector, { timeout: 10000 }),
        ]);
        if (goto.status === "rejected") throw new Error(goto.reason);
        const elements = await page.$$(rule.selector);

        for (const checker of rule.сheckers) {
          const checkResult = await getCheckResult(page, elements, checker);
          results[sectionIndex].rules[ruleIndex].сheckers.push(checkResult);
        }
      }
    }

    res.json(results);
  } catch (error) {
    res.json({ message: "Ошибка: " + String(error) }).status(400);
  } finally {
    await page.close();
  }
});

async function start() {
  try {
    browser = await puppeteer.launch();
    const server = app.listen(port, () =>
      console.log(`Server starts at http://localhost:${port}`)
    );

    server.on("close", () => browser?.close());
  } catch (error) {
    console.error(error);
  }
}

start();
