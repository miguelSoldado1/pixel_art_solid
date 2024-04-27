import type { Pixel } from "./src/types";

export function getPaintedRatio(pixels: Pixel[][], index: number) {
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

  return { currentPixels, paintedPixels };
}
