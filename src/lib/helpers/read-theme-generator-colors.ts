import { DefaultColors } from "@/constants/customization.ts";
import { ThemeGeneratorKeys } from "@/constants/application.ts";

export function readThemeGeneratorColors(): typeof DefaultColors {
  const stored = localStorage.getItem(ThemeGeneratorKeys.Colors);

  if (!stored) {
    return DefaultColors;
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(stored);
  } catch {
    return DefaultColors;
  }

  if (
    typeof parsed !== "object" ||
    parsed === null ||
    // a shallow validation that at least one element is present
    !("Base" in parsed)
  ) {
    return DefaultColors;
  }

  return parsed as typeof DefaultColors;
}