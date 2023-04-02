import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'


import "@fontsource/caveat/400.css";
import "@fontsource/amatic-sc/700.css";

import theme from '../theme'

export default function App({ Component, pageProps }: AppProps) {
  return <ChakraProvider theme={theme}>
    <Component {...pageProps} />
  </ChakraProvider>
}
