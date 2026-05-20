import { createContext, useContext } from "react";

const ThemeContext = createContext({
    themeMode: "light",
    darkTheme: () => {},
    lightTheme: () => {},
})

export const ThemeProvider = ThemeContext.Provider

export default function useTheme() { //custom hook to use the theme context
    return useContext(ThemeContext)
}