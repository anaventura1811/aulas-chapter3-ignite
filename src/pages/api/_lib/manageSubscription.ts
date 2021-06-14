import { query as q } from 'faunadb';
import { fauna } from "../../../services/fauna";
import { stripe } from '../../../services/stripe';

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false,
) {
  // Buscar o usuário no banco de dados do FaunaDB com id customer id (stripe_customer_id)

  // salvar os dados da assinatura do usuário no FaunaDB
  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(
        q.Match(
          q.Index('user_by_stripe_customer_id'),
          customerId
        )
      )
    )
  )

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,

  }

  if (createAction) {
    await fauna.query(
      // q.If(
      //   q.Not(
      //     q.Exists(
      //       q.Match(
      //         q.Index('subscription_by_id'),
      //         subscription.id
      //       )
      //     )
      //   ),
      //   q.Create(
      //     q.Collection('subscriptions'),
      //     { data: subscriptionData }
      //   )
      // )
      // )
      q.Create(
        q.Collection('subscriptions'),
        { data: subscriptionData }
      )
    )
  } else {
    await fauna.query(
      q.Replace(
        q.Select(
          "ref",
          q.Get(
            q.Match(
              q.Index('subscription_by_id'),
              subscription.id
            )
          )
        ), 
        { data: subscriptionData }
      )
    )
  }

  
}

/* 
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
*/