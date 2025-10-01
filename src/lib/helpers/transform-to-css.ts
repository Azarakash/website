import type { DefaultCSS } from "@/constants/customization.ts";

export function transformToCss(theme: typeof DefaultCSS): string {
  const { Padding } = theme.Widget;

  return "" +
    "\n" + String.raw`QWidget {` +
    "\n" + String.raw`  padding: ${Padding.Top}px ${Padding.Right}px ${Padding.Bottom}px ${Padding.Left}px;` +
    (theme.Widget.Border ? "" : "\n" + String.raw`  border: 0;`) +
    "\n" + String.raw`}`;
}