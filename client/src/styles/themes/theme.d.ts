import 'styled-components';

interface DashboardTheme {
  background_tooltip: string;
  reference_graphic_primary: string;
  reference_graphic_secondary: string;
}

interface Theme {
  dashboard: DashboardTheme;
}

// declare module 'styled-components' {
//   export interface DefaultTheme extends Theme {}
// }