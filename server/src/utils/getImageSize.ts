import { Page, ElementHandle } from "puppeteer";

//Функция получения размера изображения в байтах
export async function getImageSize(
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
