import { NextApiRequest, NextApiResponse } from 'next';

export default function users(request: NextApiRequest, response: NextApiResponse) {

  const id = request.query;
  
  const users = [
    { id: 1, name: 'Ana'},
    { id: 2, name: 'Janaina'},
    { id: 3, name: 'Luisa'},
    { id: 4, name: 'Val'}
  ]

  return response.json(users)
}