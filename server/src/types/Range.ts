//Тип диапазона значений может быть 3 видов
//От null до числа (меньше чем ...)
//От числа до null (больше чем ...)
//От числа до числа (больше чем ... и меньше чем)
export type Range = [number | null, number | null];
