import { RulesConfig } from "../../server/src/types/Config";
import { CheckResult } from "../../server/src/types/Checker";

const BASE_URL = "http://localhost:3001";

//Тестирование сайта
export const getCheckResult = async (
  url: string,
  data: RulesConfig[]
): Promise<RulesConfig<CheckResult[]>[]> => {
  const PARAMS = "?" + "url=" + url;
  const response = await fetch(BASE_URL + "/api/check" + PARAMS, {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res: RulesConfig<CheckResult[]>[] = await response.json();
  return res;
};

//Получение списка правил с сервера
export const getConfig = async (): Promise<RulesConfig[]> => {
  const response = await fetch(BASE_URL + "/api");
  const res: RulesConfig[] = await response.json();
  return res;
};
