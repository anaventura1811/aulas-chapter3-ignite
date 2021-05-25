import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp

// Se eu quiser que algo se repita em todas as páginas, preciso adicionar ao app
// É renderizado novamente toda vez que o usuário muda de pg