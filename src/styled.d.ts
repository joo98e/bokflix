import 'styled-components';

declare module 'styled-components' {

  export interface DefaultTheme {
    red: string;
    black: {
      veryDark: string;
      darker: string;
      lighter: string;
      modal? : string;
    };
    white: {
      darker: string;
      lighter: string;
      desc? : string;
      title? : string;
      content? : string;
    };
    accent?: {
      darker?: string;
      lighter?: string;
    }
  }
}

