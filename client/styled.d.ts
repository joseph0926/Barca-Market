import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      dark: string;
      light: string;
      darkPriColor: string;
      lightPriColor: string;
    };
    backgroundColor: {
      dark: string;
      light: string;
      darkPriColor: string;
      lightPriColor: string;
    };
    borderColor: {
      dark: string;
      light: string;
      darkPriColor: string;
      lightPriColor: string;
    };
  }
}
