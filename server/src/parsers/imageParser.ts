import { Page, ElementHandle } from "puppeteer";
import { ImageParser } from "../types/Parser";
import { getImageSize } from "../utils/getImageSize";

//Получение изображения
export async function imageParser(
  parser: ImageParser,
  element: ElementHandle<Element>,
  page: Page
): Promise<number> {
  if (parser.parseBy === "byteSize") {
    const size = await getImageSize(
      page,
      element as ElementHandle<HTMLImageElement>
    );
    return size || 0;
  }
  console.error(parser);
  console.error("поле parser.parseBy не установлено");
  return 0;
}
