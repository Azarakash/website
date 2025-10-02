import { DefaultCSS } from "@/constants/customization.ts";
import { ThemeGeneratorKeys } from "@/constants/application.ts";

export function readThemeGeneratorStyles(): typeof DefaultCSS {
  const stored = localStorage.getItem(ThemeGeneratorKeys.Styles);

  if (!stored) {
    return DefaultCSS;
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(stored);
  } catch {
    return DefaultCSS;
  }

  if (
    typeof parsed !== "object" ||
    parsed === null ||
    // a shallow validation that at least one element is present
    !("LayoutBorder" in parsed)
  ) {
    return DefaultCSS;
  }

  return parsed as typeof DefaultCSS;
}