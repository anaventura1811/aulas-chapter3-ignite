import { NextApiRequest, NextApiResponse } from 'next';

export default function users(request: NextApiRequest, response: NextApiResponse) {
  const users = [
    { id: 1, name: 'Ana'},
    { id: 2, name: 'Janaina'},
    { id: 3, name: 'Luisa'},
    { id: 4, name: 'Val'}
  ]

  return response.json(users)
}

// Api roots
// Estratégias de autenticação:
// 1) JWT (Storage)
// 2) Next Auth 
// -- (sistema de autenticação simples, login social - com github, facebook, google)
// -- independe de ter um backend
// -- é seguro, mas não é utilizado em todos os casos
// 3) Cognito WS, Auth0, --> providers de autenticação externos / serviço de autenticação