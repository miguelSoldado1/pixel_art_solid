import type { Pixel } from "./src/types";

export function getPaintedRatio(pixels: Pixel[][], index: number) {
  console.time("getPaintedRatio #2");
  let currentPixels = 0;
  let paintedPixels = 0;

  for (const row of pixels) {
    for (const pixel of row) {
      if (pixel.colorIndex === index) {
        currentPixels++;
        if (pixel.painted) {
          paintedPixels++;
        }
      }
    }
  }

  console.timeEnd("getPaintedRatio #2");

  return { currentPixels, paintedPixels };
}
