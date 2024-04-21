interface GenerateRandomArtParams {
  width: number;
  height: number;
  colorAmount: number;
}

export function generateRandomArt(params: GenerateRandomArtParams) {
  const { width, height, colorAmount } = params;

  const colors = Array.from({ length: colorAmount }).map(() =>
    randomHexColorString(),
  );

  const pixels = Array.from({ length: width * height }).map(() => ({
    colorIndex: Math.floor(Math.random() * colorAmount),
    painted: false,
  }));

  return { colors, pixels };
}

function randomHexColorString(): string {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
