import { ApolloProvider } from '@apollo/client'
import Layout from '../components/Layout'
import { useApollo } from '../core/createApolloClient'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WhoAmIDocument } from '../generated/graphql'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps.initialProps)
    const router = useRouter()

    useEffect(() => {
        const fetchWhoAmI = async () => {
            const result = await apolloClient.query({
                query: WhoAmIDocument,
                errorPolicy: 'all',
            })
            if (result.loading) return
            if (!result.loading && !result.data) {
                return router.push('/login')
            }
            if (result.errors) router.push('/login')
        }
        const isLoginPage = router.pathname.includes('login')
        const isRegisterPage = router.pathname.includes('register')
        const isLogoutPage = router.pathname.includes('logout')
        if (!isLoginPage && !isRegisterPage && !isLogoutPage) {
            fetchWhoAmI()
        }
    }, [])

    return (
        <ApolloProvider client={apolloClient}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ApolloProvider>
    )
}
