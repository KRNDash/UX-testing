import { RulesConfig } from "../../server/src/types/Config";
import { getConfig } from "../utils/getCheckResult.js";

//Получить значение config из LocalStorage (скачивание правил, тестирование)
export const getLocalConfig = async (): Promise<RulesConfig[]> => {
  const config = JSON.parse(String(localStorage.getItem("config")));
  // console.log(config);
  return config;
};

//Обновить LocalStorage по новым данным (Добавление правил, редактирование правил, загрузка правил)
export function setLocalConfig(config: RulesConfig[]) {
  localStorage.setItem("config", JSON.stringify(config));
}

//Установить значение config в LocalStorage с сервера (вернуть по умолчанию)
export async function setServerConfig() {
  try {
    localStorage.setItem("config", JSON.stringify(await getConfig()));
  } catch (error) {
    console.log(error);
  }
}
