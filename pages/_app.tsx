import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "reset-css";

const theme = extendTheme({
  colors: {
    gray: {
      100: "#E5E5E5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
});

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />;
    </ChakraProvider>
  );
};

export default MyApp;
