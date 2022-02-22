import React, { FC, createContext, useEffect, useContext, useState } from "react";
import { Appearance } from "react-native";
import AppStorage from "@react-native-async-storage/async-storage";

import { defaultTheme, darkTheme, COLORPROPS } from "./Color";

const colorScheme = Appearance.getColorScheme();

type THEMECONTEXT = {
  theme: COLORPROPS;
  updateTheme?: () => void;
};

const ThemeContext = createContext<THEMECONTEXT>({ theme: defaultTheme });

export const useTheme = () => useContext(ThemeContext);

const Theme: FC = ({ children }) => {
  const [theme, setTheme] = useState<any>(defaultTheme);

  useEffect(() => {
    handleTheme();
  }, []);

  const handleTheme = async () => {
    const savedTheme = await AppStorage.getItem("themeMode");
    if (savedTheme) {
      savedTheme === "dark" ? setTheme(darkTheme) : setTheme(defaultTheme);
    } else {
      if (colorScheme === "light") {
        AppStorage.setItem("theme", "default");
      } else {
        AppStorage.setItem("theme", "dark");
        setTheme(darkTheme);
      }
    }
  };

  const updateTheme = () => {
    const newTheme = theme.themeMode === "light" ? darkTheme : defaultTheme;

    setTheme(newTheme);
    AppStorage.setItem("themeMode", newTheme.themeMode);
  };

  return <ThemeContext.Provider value={{ theme, updateTheme }}>{children}</ThemeContext.Provider>;
};

export default Theme;
