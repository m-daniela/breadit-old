import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

/**
 * Change the theme
 */
const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "dark");

    const toggleTheme = () => {
        if (theme === "dark"){
            setTheme("light");
            localStorage.setItem("theme", "light");
            document.documentElement.setAttribute("data-theme", "light");
        }
        else{
            setTheme("dark");
            localStorage.setItem("theme", "dark");
            document.documentElement.setAttribute("data-theme", "dark");
        }
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
