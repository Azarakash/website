import { DefaultCSS } from "@/constants/customization.ts";

function createCssClass({
  labels,
  properties,
  comparison,
}: {
  "labels"    : Array<string>;
  "properties": Array<{
    "name" : string;
    "value": boolean | string | number;
    "unit" : string;
  }>;
  "comparison": boolean | string | number;
}): string {
  // We don't care if the value is an empty string or zero
  if (!comparison) {
    return "";
  }

  const classSelectors = labels.map((label: string, _: number, array: Array<string>) => {
    // eslint-disable-next-line unicorn/prefer-at
    if (array[array.length - 1] === label) {
      return "\n" + label;
    }

    return "\n" + label + ",";
  });
  const classFields: Array<string> = properties.map(({ name, value, unit }) => {
    if (value === false) {
      return "";
    }

    return "\n" + String.raw`  ${name}: ${value}${unit};`;
  });

  return "" +
    ""   + classSelectors.join("") + " {" +
    ""   + classFields.join("") +
    "\n" + String.raw`}`;
}

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
  const layout = createCssClass({
    "labels"    : ["#mainToolBar", "#instanceToolBar", "#statusBar", "#newsToolBar"],
    "properties": [{ "name": "border", "value": 0, "unit": "" }],
    "comparison": theme.LayoutBorder,
  });

  const tabWidgetPane = createCssClass({
    "labels"    : ["QTabWidget::pane"],
    "properties": [{ "name": "border", "value": 0, "unit": "" }],
    "comparison": theme["QTabWidget::pane"].border,
  });
  const tabWidgetTabBar = createCssClass({
    "labels"    : ["QTabWidget::tab-bar"],
    "properties": [{ "name": "left", "value": theme["QTabWidget::tab-bar"].left, "unit": "px" }],
    "comparison": theme["QTabWidget::tab-bar"].left,
  });
  const tabBarTab = createCssClass({
    "labels"    : ["QTabBar::tab"],
    "properties": [
      { "name": "border", "value": theme["QTabBar::tab"].border ? 0 : "", "unit": "" },
      { "name": "padding", "value": theme["QTabBar::tab"].padding, "unit": "" },
      { "name": "margin-right", "value": theme["QTabBar::tab"]["margin-right"], "unit": "px" },
    ],
    "comparison":
      theme["QTabBar::tab"].border ||
      theme["QTabBar::tab"].padding ||
      theme["QTabBar::tab"]["margin-right"],
  });
  const tabBarTabHover = createCssClass({
    "labels"    : ["QTabBar::tab:hover"],
    "properties": [
      { "name": "background-color", "value": theme["QTabBar::tab:hover"]["background-color"], "unit": "" },
    ],
    "comparison": theme["QTabBar::tab:hover"]["background-color"],
  });
  const tabBarTabSelected = createCssClass({
    "labels"    : ["QTabBar::tab:selected"],
    "properties": [
      { "name": "background-color", "value": theme["QTabBar::tab:selected"]["background-color"], "unit": "" },
    ],
    "comparison": theme["QTabBar::tab:selected"]["background-color"],
  });

  const toolButton =  createCssClass({
    "labels"    : ["QToolButton"],
    "properties": [
      { "name": "border", "value": theme["QToolButton"].border ? 0 : "", "unit": "" },
      { "name": "padding", "value": theme["QToolButton"].padding, "unit": "" },
      { "name": "background-color", "value": theme["QToolButton"]["background-color"], "unit": "" },
    ],
    "comparison":
      theme["QToolButton"].border ||
      theme["QToolButton"].padding ||
      theme["QToolButton"]["background-color"],
  });
  const pushButton = createCssClass({
    "labels"    : ["QPushButton"],
    "properties": [
      { "name": "border", "value": theme["QPushButton"].border ? 0 : "", "unit": "" },
      { "name": "padding", "value": theme["QPushButton"].padding, "unit": "" },
      { "name": "background-color", "value": theme["QPushButton"]["background-color"], "unit": "" },
    ],
    "comparison":
      theme["QPushButton"].border ||
      theme["QPushButton"].padding ||
      theme["QPushButton"]["background-color"],
  });
  const toolButtonHover = createCssClass({
    "labels"    : ["QToolButton:hover"],
    "properties": [
      { "name": "background-color", "value": theme["QToolButton:hover"]["background-color"], "unit": "" },
    ],
    "comparison": theme["QToolButton:hover"]["background-color"],
  });
  const pushButtonHover = createCssClass({
    "labels"    : ["QPushButton:hover"],
    "properties": [
      { "name": "background-color", "value": theme["QPushButton:hover"]["background-color"], "unit": "" },
    ],
    "comparison": theme["QPushButton:hover"]["background-color"],
  });
  const toolButtonPressed = createCssClass({
    "labels"    : ["QToolButton:pressed"],
    "properties": [
      { "name": "background-color", "value": theme["QToolButton:pressed"]["background-color"], "unit": "" },
    ],
    "comparison": theme["QToolButton:pressed"]["background-color"],
  });
  const pushButtonPressed = createCssClass({
    "labels"    : ["QPushButton:pressed"],
    "properties": [
      { "name": "background-color", "value": theme["QPushButton:pressed"]["background-color"], "unit": "" },
    ],
    "comparison": theme["QPushButton:pressed"]["background-color"],
  });
  const toolButtonOn = createCssClass({
    "labels"    : ["QToolButton:on"],
    "properties": [
      { "name": "background-color", "value": theme["QToolButton:on"]["background-color"], "unit": "" },
    ],
    "comparison": theme["QToolButton:on"]["background-color"],
  });

  const objectHandle = createCssClass({
    "labels"    : ["QObject::handle"],
    "properties": [
      { "name": "margin", "value": 2, "unit": "px" },
      { "name": "background-color", "value": highlight, "unit": "" },
    ],
    "comparison": theme["QObject::handle"],
  });

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