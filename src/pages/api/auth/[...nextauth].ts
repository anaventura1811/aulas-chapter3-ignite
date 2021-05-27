import { query as q } from 'faunadb';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { fauna } from '../../../services/fauna';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user',
    }),
    // ...add more providers here
  ],
  // jwt: {
  //   signingKey: process.env.SIGNING_KEY,
  // },
  callbacks: {
    
      async signIn(user, account, profile) {
        const { email, name } = user;
        try {
          await fauna.query(
            q.If(
              q.Not(
                q.Exists(
                  q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(email)
                  )
                )
              ),
              q.Create(
                q.Collection('users'), 
                { data: { email, name }}
              ),
              q.Get(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(email)
                )
              )
            )
          )
          return true;

        } catch {
          return false;
        }
        
      },
  }
  // A database is optional but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
})

// faunaDB - HTTP
// dynamoDB - AWS
// PostgreSQL, MongoDB
// serveless - bancos de dados que não precisem manter pull de conexao aberto
// blitz js
// redwood js
// remix run