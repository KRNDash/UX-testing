import { Page, ElementHandle } from "puppeteer";
import { ImageParser } from "../types/Parser";

async function getImageSize(
  page: Page,
  imageEl: ElementHandle<HTMLImageElement> | null
): Promise<number | null> {
  try {
    if (!imageEl) return null;
    const src = await imageEl.evaluate((el) => el.src);
    if (!src) return null;
    const response = await page.goto(src);
    if (!response) return null;
    const buffer = await response.buffer();
    const sizeInBytes = buffer.length;
    return sizeInBytes;
  } catch (error) {
    return null;
  }
}

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
