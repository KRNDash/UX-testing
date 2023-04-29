import { RulesConfig } from "../server/src/types/Config";
import { CheckResult } from "../server/src/types/Checker";
import { trackPromise } from "react-promise-tracker";

const BASE_URL = "http://localhost:3001";

export const getCheckResult = async (
  url: string
): Promise<RulesConfig<CheckResult[]>[]> => {
  const PARAMS = "?" + "url=" + url;
  // const response = await fetch(BASE_URL + "/api/check" + PARAMS);
  const response = await fetch(BASE_URL + "/api/check" + PARAMS);
  const res: RulesConfig<CheckResult[]>[] = await response.json();
  return res;
};
