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

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}