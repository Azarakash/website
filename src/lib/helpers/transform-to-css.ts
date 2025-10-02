import type { DefaultCSS } from "@/constants/customization.ts";

export function transformToCss(theme: typeof DefaultCSS): string {
  const layout = theme.LayoutBorder
    ? (
      "\n" + String.raw`#mainToolBar,` +
      "\n" + String.raw`#instanceToolBar,` +
      "\n" + String.raw`#statusBar,` +
      "\n" + String.raw`#newsToolBar {` +
      "\n" + String.raw`  border: 0;` +
      "\n" + String.raw`}` +
      "\n" + String.raw``
    ) : "";
  const tabWidgetPane = theme["QTabWidget::pane"].border
    ? (
      "\n" + String.raw`QTabWidget::pane {` +
      "\n" + String.raw`  border: ${theme["QTabWidget::pane"].border};` +
      "\n" + String.raw`}`
    ) : "";
  const tabWidgetTabBar = theme["QTabWidget::tab-bar"].left
    ? (
      "\n" + String.raw`QTabWidget::tab-bar {` +
      "\n" + String.raw`  left: ${theme["QTabWidget::tab-bar"].left}px;` +
      "\n" + String.raw`}`
    ) : "";
  const tabBarTab = (
    theme["QTabBar::tab"].border ||
    theme["QTabBar::tab"].padding ||
    theme["QTabBar::tab"]["margin-right"]
  ) ? (
      "\n" + String.raw`QTabBar::tab {` +
      (
        theme["QTabBar::tab"].border
          ? ("\n" + String.raw`  border: 0;`)
          : ""
      ) +
      (
        theme["QTabBar::tab"].padding
          ? ("\n" + String.raw`  padding: ${theme["QTabBar::tab"].padding};`)
          : ""
      ) +
      (
        theme["QTabBar::tab"]["margin-right"]
          ? ("\n" + String.raw`  margin-right: ${theme["QTabBar::tab"]["margin-right"]}px;`)
          : ""
      ) +
      "\n" + String.raw`}`
    ) : "";
  const tabBarTabHover = theme["QTabBar::tab:hover"]["background-color"]
    ? (
      "\n" + String.raw`QTabBar::tab:hover {` +
      "\n" + String.raw`  background-color: ${theme["QTabBar::tab:hover"]["background-color"]};` +
      "\n" + String.raw`}`
    ) : "";

  return "" +
    ""   + String.raw`/* Main view */` +
    ""   + layout +
    "\n" + String.raw`/* */` + "\n" +
    "\n" + String.raw`/* Settings view */` +
    ""   + tabWidgetPane +
    ""   + tabWidgetTabBar +
    ""   + tabBarTab +
    ""   + tabBarTabHover +
    "\n" + String.raw`/* */` + "\n" +
    "\n" + String.raw`/* Buttons */` +
    "\n" + String.raw`/* */` + "\n" +
    "\n" + String.raw`/* Toolbar mover */` +
    "\n" + String.raw`/* */`;
}