import { DefaultCSS } from "@/constants/customization.ts";
import { HEXToRGBA } from "@/lib/helpers/hex-to-rgba.ts";

function createCssClass({
  labels,
  properties,
  comparison,
  earlyReturn,
}: {
  "labels"    : Array<string>;
  "properties": Array<{
    "name" : string;
    "value": boolean | string | number;
    "unit" : string;
  }>;
  "comparison"  : boolean | string | number;
  "earlyReturn"?: boolean;
}): string {
  // We don't care if the value is an empty string or zero
  if (!comparison || earlyReturn) {
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

    if (typeof value === "string" && value.startsWith("#")) {
      return "\n" + String.raw`  ${name}: ${HEXToRGBA({ "hex": value })};`;
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
      { "name": "padding", "value": theme["QTabBar::tab"].padding, "unit": "px" },
      { "name": "margin-right", "value": theme["QTabBar::tab"]["margin-right"], "unit": "px" },
    ],
    "comparison":
      theme["QTabBar::tab"].border ||
      theme["QTabBar::tab"].padding ||
      theme["QTabBar::tab"]["margin-right"],
    "earlyReturn": !theme["QTabBar::tab"].border,
  });
  const tabBarTabHover = createCssClass({
    "labels"    : ["QTabBar::tab:hover"],
    "properties": [
      { "name": "background-color", "value": theme["QTabBar::tab:hover"]["background-color"], "unit": "" },
    ],
    "comparison" : theme["QTabBar::tab:hover"]["background-color"],
    "earlyReturn": !theme["QTabBar::tab"].border,
  });
  const tabBarTabSelected = createCssClass({
    "labels"    : ["QTabBar::tab:selected"],
    "properties": [
      { "name": "background-color", "value": theme["QTabBar::tab:selected"]["background-color"], "unit": "" },
    ],
    "comparison" : theme["QTabBar::tab:selected"]["background-color"],
    "earlyReturn": !theme["QTabBar::tab"].border,
  });

  const toolButton =  createCssClass({
    "labels"    : ["QToolButton"],
    "properties": [
      { "name": "border", "value": theme["QToolButton"].border ? 0 : "", "unit": "" },
      { "name": "padding", "value": theme["QToolButton"].padding, "unit": "px" },
      { "name": "background-color", "value": theme["QToolButton"]["background-color"], "unit": "" },
    ],
    "comparison":
      theme["QToolButton"].border ||
      theme["QToolButton"].padding ||
      theme["QToolButton"]["background-color"],
    "earlyReturn": !theme["QToolButton"].border,
  });
  const pushButton = createCssClass({
    "labels"    : ["QPushButton"],
    "properties": [
      { "name": "border", "value": theme["QPushButton"].border ? 0 : "", "unit": "" },
      { "name": "padding", "value": theme["QPushButton"].padding, "unit": "px" },
      { "name": "background-color", "value": theme["QPushButton"]["background-color"], "unit": "" },
    ],
    "comparison":
      theme["QPushButton"].border ||
      theme["QPushButton"].padding ||
      theme["QPushButton"]["background-color"],
    "earlyReturn": !theme["QPushButton"].border,
  });
  const toolButtonHover = createCssClass({
    "labels"    : ["QToolButton:hover"],
    "properties": [
      { "name": "background-color", "value": theme["QToolButton:hover"]["background-color"], "unit": "" },
    ],
    "comparison" : theme["QToolButton:hover"]["background-color"],
    "earlyReturn": !theme["QToolButton"].border,
  });
  const pushButtonHover = createCssClass({
    "labels"    : ["QPushButton:hover"],
    "properties": [
      { "name": "background-color", "value": theme["QPushButton:hover"]["background-color"], "unit": "" },
    ],
    "comparison" : theme["QPushButton:hover"]["background-color"],
    "earlyReturn": !theme["QPushButton"].border,
  });
  const toolButtonPressed = createCssClass({
    "labels"    : ["QToolButton:pressed"],
    "properties": [
      { "name": "background-color", "value": theme["QToolButton:pressed"]["background-color"], "unit": "" },
    ],
    "comparison" : theme["QToolButton:pressed"]["background-color"],
    "earlyReturn": !theme["QToolButton"].border,
  });
  const pushButtonPressed = createCssClass({
    "labels"    : ["QPushButton:pressed"],
    "properties": [
      { "name": "background-color", "value": theme["QPushButton:pressed"]["background-color"], "unit": "" },
    ],
    "comparison" : theme["QPushButton:pressed"]["background-color"],
    "earlyReturn": !theme["QPushButton"].border,
  });
  const toolButtonOn = createCssClass({
    "labels"    : ["QToolButton:on"],
    "properties": [
      { "name": "background-color", "value": theme["QToolButton:on"]["background-color"], "unit": "" },
    ],
    "comparison" : theme["QToolButton:on"]["background-color"],
    "earlyReturn": !theme["QToolButton"].border,
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
    toolButton +
    pushButton +
    toolButtonHover +
    pushButtonHover +
    toolButtonPressed +
    pushButtonPressed +
    toolButtonOn +
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