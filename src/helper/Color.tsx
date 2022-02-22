const defaultColors = {
  primary: "#fc6b02",
  transparent: "transparent",
  freeze: "#f6f6f6",
  blue: "#8190a5",
  yellow: "#ffd700",
  pink: "#f95f62",
  gray: "#e9e9e9",
  lightRed: "#ff7f7f",
  lightYellow: "#eab079",
  lightGreen: "#82c596",
};

export type COLORPROPS = {
  backgroundColor: string;
  textColor: string;
  lightGray: string;
  darkGray: string;
  darkBlue: string;
  primary: string;
  transparent: string;
  freeze: string;
  blue: string;
  yellow: string;
  pink: string;
  gray: string;
  lightRed: string;
  lightYellow: string;
  lightGreen: string;
  themeMode: string;
};
export const defaultTheme: COLORPROPS = {
  ...defaultColors,
  backgroundColor: "#fff",
  textColor: "#000",
  lightGray: "#f0f0f0",
  darkGray: "#a1a1a4",
  darkBlue: "#47525e",
  themeMode: "light",
};

export const darkTheme: COLORPROPS = {
  ...defaultColors,
  backgroundColor: "#000",
  textColor: "#fff",
  lightGray: "#a1a1a4",
  darkGray: "#f0f0f0",
  darkBlue: "#9bb0c7",
  themeMode: "dark",
};

export const orange = "#fc6b02";
export const yellow = "#ffd700";

export const gray = "#e9e9e9";
export const lightGray = "#f0f0f0";
export const darkGray = "#a1a1a4";

export const pink = "#f95f62";
export const lightRed = "#ff7f7f";
export const lightYellow = "#eab079";
export const lightGreen = "#82c596";
