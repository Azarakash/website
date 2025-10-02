export const CustomizationTabs = [
  {
    "Key" : "colors",
    "Name": "Colors tab",
    "Icon": "i-lucide-palette",
  },
  {
    "Key" : "general",
    "Name": "General tab",
    "Icon": "i-lucide-bolt",
  },
  {
    "Key" : "buttons",
    "Name": "Buttons tab",
    "Icon": "i-lucide-square-mouse-pointer",
  },
  {
    "Key" : "inputs",
    "Name": "Inputs tab",
    "Icon": "i-lucide-text-cursor-input",
  },
] as const;
export const DefaultColors = {
  "AlternateBase"  : "#2b2b2b",
  "Base"           : "#242424",
  "BrightText"     : "#e0e031", // not sure what this does. maybe accessibility thing?
  "Button"         : "#303030",
  "ButtonText"     : "#ffffff",
  "Highlight"      : "#96db59",
  "HighlightedText": "#000000",
  "Link"           : "#3291cc",
  "Text"           : "#f0f0f0",
  "ToolTipBase"    : "#ffffdc",
  "ToolTipText"    : "#000000",
  "Window"         : "#313131",
  "WindowText"     : "#ffffff",

  /*
   * "fadeAmount"     : 0.5, // not sure what this does
   * "fadeColor"      : "#000000", // not sure what this does
   */
};

/** 'false' means that we don't need to apply these styles */
export const DefaultCSS = {
  "LayoutBorder"   : false,
  "QObject::handle": false,
  "QToolButton"    : {
    "border"          : false,
    "background-color": false,
    "padding"         : false,
  },
  "QToolButton:on"     : { "background-color": false },
  "QToolButton:hover"  : { "background-color": false },
  "QToolButton:pressed": { "background-color": false },
  "QPushButton"        : {
    "border"          : false,
    "background-color": false,
    "padding"         : false,
  },
  "QPushButton:on"     : { "background-color": false },
  "QPushButton:hover"  : { "background-color": false },
  "QPushButton:pressed": { "background-color": false },
  "QTabWidget::pane"   : { "border": false },
  "QTabWidget::tab-bar": { "left": false },
  "QTabBar::tab"       : {
    "padding"     : false,
    "margin-right": false,
    "border"      : false,
  },
  "QTabBar::tab:hover"   : { "background-color": false },
  "QTabBar::tab:selected": { "background-color": false },
};