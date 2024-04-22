import type { Pixel } from "./src/types";

interface GenerateRandomArtParams {
  width: number;
  height: number;
  colorAmount: number;
}

interface AddBigSplatterParams {
  pixels: Pixel[];
  colorIndex: number;
  width: number;
  height: number;
}

export function generateRandomArt(params: GenerateRandomArtParams) {
  const { width, height, colorAmount } = params;

  const colors = Array.from({ length: colorAmount }).map(() =>
    randomBrightHexColorString(),
  );

  let pixels = Array.from({ length: width * height }).map(() => ({
    colorIndex: Math.floor(Math.random() * colorAmount),
    painted: false,
  }));

  const splatterParams = { pixels, width, height };
  const splatterIndexes = [0, 0, 1, 2, 5, 6, 7];

  for (const index of splatterIndexes) {
    pixels = addBigSplatter({ ...splatterParams, colorIndex: index });
  }

  return { colors, pixels };
}

function addBigSplatter(params: AddBigSplatterParams): Pixel[] {
  const { pixels, colorIndex, width, height } = params;

  const splatSize = Math.min(width, height) / 3;

  // Generate a random splat position within the grid
  const splatX = Math.floor(Math.random() * width);
  const splatY = Math.floor(Math.random() * height);

  // Generate a random splatter pattern
  const splatter = generateSplatterPattern(splatSize);

  // Add the splatter to the pixels array
  for (let x = splatX; x < splatX + splatSize; x++) {
    for (let y = splatY; y < splatY + splatSize; y++) {
      if (x < width && y < height) {
        const index = x + y * width;
        if (splatter[x - splatX][y - splatY]) {
          pixels[index] = { colorIndex, painted: false };
        }
      }
    }
  }

  return pixels;
}

function generateSplatterPattern(size: number): boolean[][] {
  const pattern: boolean[][] = [];
  const center = size / 2;
  for (let x = 0; x < size; x++) {
    pattern[x] = [];
    for (let y = 0; y < size; y++) {
      const distance = Math.sqrt((x - center) ** 2 + (y - center) ** 2);
      const randomFactor = Math.random() * 0.3; // Introduce randomness
      const threshold = center - randomFactor * center;
      pattern[x][y] = distance <= threshold; // Paint pixels within the circle with randomness
    }
  }
  return pattern;
}

function randomBrightHexColorString(): string {
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);

  // Ensure the color is bright by making sure all channels are above a certain threshold
  let threshold = 200; // Adjust this threshold as needed
  if (red < threshold && green < threshold && blue < threshold) {
    return randomBrightHexColorString();
  }

  // Convert the RGB values to hexadecimal and concatenate them
  return `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`;
}
