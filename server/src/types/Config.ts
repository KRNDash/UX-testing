import { Checker } from "./Checker";

export interface Rule<T> {
  id: number;
  selector: string;
  ruleName: string;
  сheckers: T[];
}

export interface RulesConfig<T = Checker> {
  id: number;
  section: string;
  rules: Rule<T>[];
}
