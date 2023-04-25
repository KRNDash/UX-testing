export function convertRemToPixels(rem: number): number {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function convertEmToPixels(em: number, parentElement: Element): number {
  return em * parseFloat(window.getComputedStyle(parentElement).fontSize);
}
