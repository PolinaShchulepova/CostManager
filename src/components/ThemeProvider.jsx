import { createContext, useContext, useState } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import PropTypes from "prop-types";

// Create a context to manage theme state globally
const ThemeContext = createContext();

/**
 * Custom hook to access the theme context.
 * This allows components to toggle between light and dark mode.
 */
export function useTheme() {
    return useContext(ThemeContext);
}

/**
 * ThemeProvider component that wraps the application in a theme context.
 * It provides a toggle function to switch between light and dark themes.
 */
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light");

    // Define the light theme with customized colors
    const lightTheme = createTheme({
        palette: {
            mode: "light",
            primary: {
                main: "#D8BFAA",
            },
            secondary: {
                main: "#ff47a6",
            },
            background: {
                default: "#F9F7F0",
            },
        },
    });

    // Define the dark theme with customized colors
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "#B89D6D",
            },
            secondary: {
                main: "#E3B79B",
            },
            background: {
                default: "#2A2A2A",
            },
        },
    });

    // Select the appropriate theme based on the current state
    const muiTheme = theme === "light" ? lightTheme : darkTheme;

    /**
     * Toggles between light and dark theme modes.
     * This function updates the state, causing the UI to re-render.
     */
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <MuiThemeProvider theme={muiTheme}>
                <CssBaseline /> {/* Ensures consistent UI across themes */}

                {/* Theme toggle button for switching between light and dark mode */}
                <button className="theme-toggle" onClick={toggleTheme}>
                    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
}

// Define PropTypes for the ThemeProvider component
ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired
};
