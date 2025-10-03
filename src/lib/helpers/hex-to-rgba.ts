export function HEXToRGBA({
  hex,
  alpha = 255,
}: {
  "hex"   : string;
  "alpha"?: number;
}): string {
  const red = Number.parseInt(hex.slice(1, 3), 16);
  const green = Number.parseInt(hex.slice(3, 5), 16);
  const blue = Number.parseInt(hex.slice(5, 7), 16);
  let maybeAlpha: number;

  try {
    maybeAlpha = Number.parseInt(hex.slice(7, 9), 16);
  } catch {
    maybeAlpha = alpha;
  }

  if (Number.isNaN(maybeAlpha)) {
    maybeAlpha = alpha;
  }

  return `rgba(${red}, ${green}, ${blue}, ${maybeAlpha})`;
}