import { DefaultTheme } from 'styled-components';

// default
const dark: DefaultTheme = {
    red: "#E51013",
    black: {
        veryDark: "#141414",
        darker: "#181818",
        lighter: "#2F2F2F",
        modal : "rgba(0, 0, 0, 0.5)"
    },
    white: {
        lighter: "#fff",
        darker: "#e5e5e5",
        desc : "#cccccc",
        title : "#9C9C9C",
        content: "#AAAAAA"
    },
    accent : {
        lighter : "#66ffcc",
        darker : ""
    }
}

const theme = {
    dark: dark, // default
}

export default theme;