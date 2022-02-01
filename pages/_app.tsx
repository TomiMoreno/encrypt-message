import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import NavBar from '../features/NavBar'

function MyApp({ Component, pageProps } : AppProps) {
  return (
    <ChakraProvider>
      <NavBar />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp