import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import Head from 'next/Head';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | IgNews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
           <time>27 de maio de 2021</time>
           <strong>Um bolo de pêra com gengibre e um balanço dos últimos meses (até o momento)</strong>
           <p>É impressão minha ou agosto simplesmente voou? Acho que cheguei oficialmente naquela
             época do ano em que começo a pensar em retrospecto, olhando para tudo o que consegui 
             fazer nos últimos meses. Ontem mesmo estava pensando no quanto eu produzi, nos cursos
             que concluí, nos artigos aceitos para publicação, nos artigos já publicados, no capítulo 
             de livro feito em trio e revisado, no desenvolvimento da minha pesquisa no doutorado, na 
             escrita dos capítulos da tese (que finalmente estão começando a sair da minha cabeça e a 
             surgir no papel!) mesmo nessa loucura toda de pandemia, e também nos meus relacionamentos, 
             nas pessoas que entraram na minha vida e que agora são parte essencial dela. E é com um 
             certo estranhamento que eu constato que, de fato, este mês de setembro chegou pra me mostrar 
             que, por mais que eu fique frustrada ao pensar em tudo que eu planejei e ainda não dei conta 
             de executar, sim, eu já fiz muita coisa.</p>
          </a>
          <a href="#">
           <time>27 de maio de 2021</time>
           <strong>Um bolo de pêra com gengibre e um balanço dos últimos meses (até o momento)</strong>
           <p>É impressão minha ou agosto simplesmente voou? Acho que cheguei oficialmente naquela
             época do ano em que começo a pensar em retrospecto, olhando para tudo o que consegui 
             fazer nos últimos meses. Ontem mesmo estava pensando no quanto eu produzi, nos cursos
             que concluí, nos artigos aceitos para publicação, nos artigos já publicados, no capítulo 
             de livro feito em trio e revisado, no desenvolvimento da minha pesquisa no doutorado, na 
             escrita dos capítulos da tese (que finalmente estão começando a sair da minha cabeça e a 
             surgir no papel!) mesmo nessa loucura toda de pandemia, e também nos meus relacionamentos, 
             nas pessoas que entraram na minha vida e que agora são parte essencial dela. E é com um 
             certo estranhamento que eu constato que, de fato, este mês de setembro chegou pra me mostrar 
             que, por mais que eu fique frustrada ao pensar em tudo que eu planejei e ainda não dei conta 
             de executar, sim, eu já fiz muita coisa.</p>
          </a>
          <a href="#">
           <time>27 de maio de 2021</time>
           <strong>Um bolo de pêra com gengibre e um balanço dos últimos meses (até o momento)</strong>
           <p>É impressão minha ou agosto simplesmente voou? Acho que cheguei oficialmente naquela
             época do ano em que começo a pensar em retrospecto, olhando para tudo o que consegui 
             fazer nos últimos meses. Ontem mesmo estava pensando no quanto eu produzi, nos cursos
             que concluí, nos artigos aceitos para publicação, nos artigos já publicados, no capítulo 
             de livro feito em trio e revisado, no desenvolvimento da minha pesquisa no doutorado, na 
             escrita dos capítulos da tese (que finalmente estão começando a sair da minha cabeça e a 
             surgir no papel!) mesmo nessa loucura toda de pandemia, e também nos meus relacionamentos, 
             nas pessoas que entraram na minha vida e que agora são parte essencial dela. E é com um 
             certo estranhamento que eu constato que, de fato, este mês de setembro chegou pra me mostrar 
             que, por mais que eu fique frustrada ao pensar em tudo que eu planejei e ainda não dei conta 
             de executar, sim, eu já fiz muita coisa.</p>
          </a>
          <a href="">
           <time>27 de maio de 2021</time>
           <strong>Um bolo de pêra com gengibre e um balanço dos últimos meses (até o momento)</strong>
           <p>É impressão minha ou agosto simplesmente voou? Acho que cheguei oficialmente naquela
             época do ano em que começo a pensar em retrospecto, olhando para tudo o que consegui 
             fazer nos últimos meses. Ontem mesmo estava pensando no quanto eu produzi, nos cursos
             que concluí, nos artigos aceitos para publicação, nos artigos já publicados, no capítulo 
             de livro feito em trio e revisado, no desenvolvimento da minha pesquisa no doutorado, na 
             escrita dos capítulos da tese (que finalmente estão começando a sair da minha cabeça e a 
             surgir no papel!) mesmo nessa loucura toda de pandemia, e também nos meus relacionamentos, 
             nas pessoas que entraram na minha vida e que agora são parte essencial dela. E é com um 
             certo estranhamento que eu constato que, de fato, este mês de setembro chegou pra me mostrar 
             que, por mais que eu fique frustrada ao pensar em tudo que eu planejei e ainda não dei conta 
             de executar, sim, eu já fiz muita coisa.</p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'publication')
  ], {
    fetch: ['publication.title', 'publication.content'],
    pageSize: 100, 
    // trabalhar sempre com paginação
  })

 const posts = response.results.map(post => {
   return {
     slug: post.uid,
     title: RichText.asText(post.data.title),
     abstract: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
   }
 })

  return {
    props: {}
  }
}