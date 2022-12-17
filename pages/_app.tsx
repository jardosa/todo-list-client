import { ApolloProvider } from '@apollo/client'
import Layout from '../components/Layout'
import createApolloClient from '../core/createApolloClient'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={createApolloClient()}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}
