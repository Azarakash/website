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
] as const;
export const DefaultColors = {
  "AlternateBase"  : "#2b2b2b",
  "Base"           : "#242424",
  "BrightText"     : "#e0e031", // not sure what this does. maybe accessibility thing?
  "Button"         : "#3c3c3c",
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
  "LayoutBorder"   : false as boolean,
  "QObject::handle": false as boolean,
  "QToolButton"    : {
    "border"          : false as boolean,
    "background-color": false as (false | string),
    "padding"         : false as (false | number),
  },
  "QToolButton:on"     : { "background-color": false as (false | string) },
  "QToolButton:hover"  : { "background-color": false as (false | string) },
  "QToolButton:pressed": { "background-color": false as (false | string) },
  "QPushButton"        : {
    "border"          : false as boolean,
    "background-color": false as (false | string),
    "padding"         : false as (false | number),
  },
  "QPushButton:on"     : { "background-color": false as (false | string) },
  "QPushButton:hover"  : { "background-color": false as (false | string) },
  "QPushButton:pressed": { "background-color": false as (false | string) },
  "QTabWidget::pane"   : { "border": false as boolean },
  "QTabWidget::tab-bar": { "left": false as (false | number) },
  "QTabBar::tab"       : {
    "padding"     : false as (false | number),
    "margin-right": false as (false | number),
    "border"      : false as boolean,
  },
  "QTabBar::tab:hover"   : { "background-color": false as (false | string) },
  "QTabBar::tab:selected": { "background-color": false as (false | string) },
};