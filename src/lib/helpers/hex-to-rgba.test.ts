import { expect, test } from "vitest";
import { HEXToRGBA } from "./hex-to-rgba.ts";

const testData: Array<[{ "hex": string; "alpha"?: number }, string]> = [
  [{ "hex": "#7f11e0", "alpha": 255 }, "rgba(127, 17, 224, 255)"],
  [{ "hex": "#00d1b2", "alpha": 255 }, "rgba(0, 209, 178, 255)"],
  [{ "hex": "#00d1b2" }, "rgba(0, 209, 178, 255)"],
  [{ "hex": "#000000" }, "rgba(0, 0, 0, 255)"],
  [{ "hex": "#ffffff" }, "rgba(255, 255, 255, 255)"],
  [{ "hex": "#ff00ff" }, "rgba(255, 0, 255, 255)"],
  [{ "hex": "#0000ff", "alpha": 0 }, "rgba(0, 0, 255, 0)"],
  [{ "hex": "#00ffff", "alpha": 123 }, "rgba(0, 255, 255, 123)"],
];

for (const [input, output] of testData) {
  const testName = `HEX to RGBA: ${JSON.stringify(input)}`;

  test(testName, () => {
    expect(HEXToRGBA(input)).toBe(output);
  });
}