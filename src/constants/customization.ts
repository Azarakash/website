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
  {
    "Key" : "others",
    "Name": "Others tab",
    "Icon": "i-lucide-ellipsis",
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
export const DefaultCSS = {
  "Enabled": false,
  "Widget" : {
    "Padding": {
      "Top"   : 2,
      "Right" : 4,
      "Bottom": 2,
      "Left"  : 4,
    },
    "Border": false,
  },
  "Handle": false,
};