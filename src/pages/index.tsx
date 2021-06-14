import { GetStaticProps } from 'next';
import Head from 'next/Head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss';

// Client-side - ação do usuário (ex: clique do botão), info que não precisa já estar ali quando a pg é carregada
// ---> Ex. Client-side: comentários de um blog
// Server-side - precisa tbm de indexação, mas precisam mudar de forma dinâmica (autenticação de usuário, etc)
// Static site generation - pra casos em que não há problema gerar 
// --- html 'estático' pra todo usuário que acessa e que precisam de indexação no google

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product } : HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News on the <span>React</span> world</h1>
          <p>
            Get access to all the publications <br />
            <span>for { new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(product.amount)} month</span>
          </p>
          <SubscribeButton priceId={ product.priceId }/>
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1IvRdlDh2eW6qkzQWPbjmSUr', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: price.unit_amount / 100,
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 horas - SSG é mais performático - já SSR é mais dinâmico
  }
}
