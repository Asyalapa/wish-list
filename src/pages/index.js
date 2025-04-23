import Head from 'next/head';
import WelcomeMain from '@/src/components/WelcomeMain';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Список пожеланий</title>
      </Head>
      
      <WelcomeMain />
    </>
  )
}
