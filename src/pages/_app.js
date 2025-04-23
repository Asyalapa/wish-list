import '@/src/styles/style.css'
import { useRouter } from 'next/router'
import Head from 'next/head';
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'
import { AuthProvider } from '@/src/context/AuthContext'
import { DraftProvider } from '@/src/context/DraftContext'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const path = router.pathname

  const isWelcomePage = path === '/'
  const isLists = path === '/lists'
  const isEventPage = path.startsWith('/event/[id]')
  /* ПОМЕНЯТЬ ПУТЬ !!! */

  const showHeader = !isEventPage;
  const showFullHeader = !isWelcomePage;

  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <AuthProvider>
      <DraftProvider>
        {showHeader && (
          <Header 
            isWelcomePage={isWelcomePage} 
            isLists={isLists}
            showFullHeader={showFullHeader}
          />
        )}
        <Component {...pageProps} />
        <Footer isEventPage={isEventPage} />
      </DraftProvider>
    </AuthProvider>
    </>
  )
}
