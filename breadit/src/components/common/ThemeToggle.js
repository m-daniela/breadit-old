import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeProvider';

import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded';
import Brightness3RoundedIcon from '@material-ui/icons/Brightness3Rounded';


const ThemeToggle = () => {
    const {theme, toggleTheme} = useContext(ThemeContext);
    return (
        <span className="theme-toggle" onClick={toggleTheme}>{theme === "dark" ? <Brightness3RoundedIcon /> : <WbSunnyRoundedIcon />}</span>
    );
};

export default ThemeToggle;
