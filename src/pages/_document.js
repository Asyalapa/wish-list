import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <meta
          name="description"
          content="Удобный онлайн-вишлист для планирования подарков. Выбирайте, отмечайте, вносите суммы и делитесь списком желаемых подарков с близкими."
        />
        <link rel="shortcut icon" href="/images/gift.webp" type="image/webp" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
