import { DefaultCSS } from "@/constants/customization.ts";

export function transformToCss({
  theme,
  highlight,
}: {
  "theme"    : typeof DefaultCSS;
  "highlight": string;
}): {
  "changed": boolean;
  "result" : string;
} {
  const layout = theme.LayoutBorder
    ? (
      "\n" + String.raw`#mainToolBar,` +
      "\n" + String.raw`#instanceToolBar,` +
      "\n" + String.raw`#statusBar,` +
      "\n" + String.raw`#newsToolBar {` +
      "\n" + String.raw`  border: 0;` +
      "\n" + String.raw`}`
    ) : "";

  const tabWidgetPane = theme["QTabWidget::pane"].border
    ? (
      "\n" + String.raw`QTabWidget::pane {` +
      "\n" + String.raw`  border: 0;` +
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
  const tabBarTabSelected = theme["QTabBar::tab:selected"]["background-color"]
    ? (
      "\n" + String.raw`QTabBar::tab:selected {` +
      "\n" + String.raw`  background-color: ${theme["QTabBar::tab:selected"]["background-color"]};` +
      "\n" + String.raw`}`
    ) : "";

  const toolButton = (
    theme["QToolButton"].border ||
    theme["QToolButton"].padding ||
    theme["QToolButton"]["background-color"]
  ) ? ("") : "";
  const pushButton = (
    theme["QPushButton"].border ||
    theme["QPushButton"].padding ||
    theme["QPushButton"]["background-color"]
  ) ? ("") : "";
  const toolButtonHover = theme["QToolButton:hover"]["background-color"]
    ? ("") : "";
  const pushButtonHover = theme["QPushButton:hover"]["background-color"]
    ? ("") : "";
  const toolButtonPressed = theme["QToolButton:pressed"]["background-color"]
    ? ("") : "";
  const pushButtonPressed = theme["QPushButton:pressed"]["background-color"]
    ? ("") : "";
  const toolButtonOn = theme["QToolButton:on"]["background-color"]
    ? ("") : "";

  const objectHandle = theme["QObject::handle"]
    ? (
      "\n" + String.raw`QObject::handle {` +
      "\n" + String.raw`  margin: 2px;` +
      "\n" + String.raw`  background: ${highlight};` +
      "\n" + String.raw`}`
    ) : "";

  // we could just JSON#stringify both objects and compare them as strings... maybe?
  const changed = "" !==
    layout +
    tabWidgetPane +
    tabWidgetTabBar +
    tabBarTab +
    tabBarTabHover +
    tabBarTabSelected +
    objectHandle;
  const result =
    ""   + String.raw`/* Main view */` +
    ""   + layout +
    "\n" + String.raw`/* */` + "\n" +
    "\n" + String.raw`/* Settings view */` +
    ""   + tabWidgetPane +
    ""   + tabWidgetTabBar +
    ""   + tabBarTab +
    ""   + tabBarTabHover +
    ""   + tabBarTabSelected +
    "\n" + String.raw`/* */` + "\n" +
    "\n" + String.raw`/* Buttons */` +
    ""   + toolButton +
    ""   + pushButton +
    ""   + toolButtonHover +
    ""   + pushButtonHover +
    ""   + toolButtonPressed +
    ""   + pushButtonPressed +
    ""   + toolButtonOn +
    "\n" + String.raw`/* */` + "\n" +
    "\n" + String.raw`/* Toolbar mover */` +
    ""   + objectHandle +
    "\n" + String.raw`/* */`;

  return { changed, result };
}