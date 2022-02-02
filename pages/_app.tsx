import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import Layout from '../features/Layout'

function MyApp({ Component, pageProps } : AppProps) {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp