import { useEffect, useState } from "react";
import { getLocalConfig } from "../utils/localStorage";
import { RulesConfig } from "../../server/src/types/Config";

//Хук справа
export default function useGetLocalConfig() {
  const [localConfig, setLocalConfig] = useState<RulesConfig[]>([]);

  useEffect(() => {
    setLocalConfig(getLocalConfig());
  }, []);

  return localConfig;
}
