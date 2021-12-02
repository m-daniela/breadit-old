import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

/**
 * Change the theme
 */
const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "dark");
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    const toggleTheme = () => {
        if (theme === "dark"){
            setTheme("light");
        }
        else{
            setTheme("dark");
        }
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
