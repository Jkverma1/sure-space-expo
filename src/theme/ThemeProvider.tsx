import React, { createContext, useContext } from 'react';
import theme, { ThemeType } from './index';

const ThemeContext = createContext<ThemeType>(theme);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};