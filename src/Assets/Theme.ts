import { DefaultTheme } from 'styled-components';

// default
const dark: DefaultTheme = {
    red: "#E51013",
    black: {
        veryDark: "#141414",
        darker: "#181818",
        lighter: "#2F2F2F",
    },
    white: {
        lighter: "#fff",
        darker: "#e5e5e5",
        desc : "#cccccc"
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