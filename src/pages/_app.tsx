import '@/styles/globals.css'
import type { AppProps } from 'next/app';
// import { ApolloProvider } from '@apollo/client';
// import { graphqlClient } from '../components/GraphqlClient';
import { createTheme, ThemeProvider, ThemeOptions } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';
  
export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#6D9029',
      dark: '#688a27',
    },
    secondary: {
      main: '#ec7700',
    },
    background: {
      default: '#CBF281',
    },
    divider: '#cbcbc0',
    text: {
      primary: '#2E2E2E',
    },
    info: {
      main: '#272727',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
      fontSize:'1.1rem'
    }
  },
};


const tema = createTheme(themeOptions);
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
  
  // const apolloClient = initApolloClient({ uri: apiPath });
  // return(
  //     <CssBaseline>
  //       <ThemeProvider theme={tema}>
  //         { <Component {...pageProps}/> }
  //       </ThemeProvider>
  //     </CssBaseline>
  // )
}
