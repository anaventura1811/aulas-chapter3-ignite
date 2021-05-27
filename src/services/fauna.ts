import { Client } from 'faunadb';

export const fauna = new Client({
  secret: process.env.FAUNADB_KEY
})

// isso já me dá acesso ao banco de dados