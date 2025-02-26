

// import { Webhook } from 'svix'

// //import { Webhook } from 'svix'
// import { headers } from 'next/headers'
// //import { WebhookEvent } from '@clerk/nextjs/server'
// //import { createOrUpdateUser, deleteUser } from '@/lib/actions/user'

// export async function POST(req) {

//   const SIGNING_SECRET = process.env.SIGNING_SECRET

//   if (!SIGNING_SECRET) {
//     throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
//   }

//   // Create new Svix instance with secret
//   const wh = new Webhook(SIGNING_SECRET)

//   // Get headers
//   const headerPayload = await headers()
//   const svix_id = headerPayload.get('svix-id')
//   const svix_timestamp = headerPayload.get('svix-timestamp')
//   const svix_signature = headerPayload.get('svix-signature')

//   // If there are no headers, error out
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response('Error: Missing Svix headers', {
//       status: 400,
//     })
//   }

//   // Get body
//   const payload = await req.json()
//   const body = JSON.stringify(payload)

//   let evt

//   // Verify payload with headers
//   try {
//     evt = wh.verify(body, {
//       'svix-id': svix_id,
//       'svix-timestamp': svix_timestamp,
//       'svix-signature': svix_signature,
//     })

//   } catch (err) {
//     console.error('Error: 111 Could not verify webhook:', err)
//     return new Response('Error: 222 Verification error', {
//       status: 400,
//     })
//   }

//   // Do something with payload
//   // For this guide, log payload to console
//   const { id } = evt.data
//   const eventType = evt.type
//   console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
//   console.log('Webhook payload:', body)




// // приходит из lib/actions/user.js
//   if (eventType === 'user.created') {
//       console.log('User created');
//   }

// // приходит из lib/actions/user.js
//   if (eventType === 'user.updated') {
//       console.log('User UPDATED');
//   }




// if (eventType === 'user.created' || eventType === 'user.updated') {
//     const { id, first_name, last_name, image_url, email_addresses, username } =
//       evt?.data;

//     try {
//       // приходит из lib/actions/user.js
//       await createOrUpdateUser(
//         id,
//         first_name,
//         last_name,
//         image_url,
//         email_addresses,
//         username
//       );
//       return new Response('User is created or updated', {
//         status: 200,
//       });

//     } catch (error) {
//       console.log('Error creating or updating user:', error);
//       return new Response('Error occured', {
//         status: 400,
//       });
//     }
//   }
//   if (eventType === 'user.deleted') {
//     const { id } = evt?.data;
//     try {

//       // приходит из lib/actions/user.js
//       await deleteUser(id);
//       return new Response('User is deleted', {
//         status: 200,
//       });

//     } catch (error) {
//       console.log('999 Error deleting user 999:', error);
//       return new Response('Error occured', {
//         status: 400,
//       });
//     }
//   }

//   return new Response('', { status: 200 });
// }

//   return new Response('Webhook received', { status: 200 })
// }









// from 
// export async function POST(req) {
//   const SIGNING_SECRET = process.env.SIGNING_SECRET;

//   if (!SIGNING_SECRET) {
//     throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local');
//   }

//   // Create new Svix instance with secret
//   const wh = new Webhook(SIGNING_SECRET);

//   // Get headers
//   const headerPayload = await headers();
//   const svix_id = headerPayload.get('svix-id');
//   const svix_timestamp = headerPayload.get('svix-timestamp');
//   const svix_signature = headerPayload.get('svix-signature');

//   // Log headers for debugging
//   console.log('Headers:', {
//     svix_id,
//     svix_timestamp,
//     svix_signature,
//   });

//   // If there are no headers, error out
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response('Error: Missing Svix headers', {
//       status: 400,
//     });
//   }

//   // Get body
//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   // Log payload for debugging
//   console.log('Payload:', payload);

//   let evt;

//   // Verify payload with headers
//   try {
//     evt = wh.verify(body, {
//       'svix-id': svix_id,
//       'svix-timestamp': svix_timestamp,
//       'svix-signature': svix_signature,
//     });
//   } catch (err) {
//     console.error('Error: Could not verify webhook:', err);
//     return new Response('Error: Verification error', {
//       status: 400,
//     });
//   }

//   // Do something with payload
//   const { id } = evt.data;
//   const eventType = evt.type;
//   console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
//   console.log('Webhook payload:', body);
//   return new Response('', { status: 200 });
// }















// ЭТОТ WEBHOOK приходит из Clerk с этой страницы
// https://clerk.com/docs/webhooks/sync-data
// start === и end === уже сами дописывали 


//import { createOrUpdateUser, deleteUser } from '@/lib/actions/user'
import { createOrUpdateUser, deleteUser } from '@/lib/actions/user'

import { Webhook } from 'svix'
import { headers } from 'next/headers'
//import { WebhookEvent } from '@clerk/nextjs/server'

export async function POST(req) {

  // SIGNING_SECRET для  URL https://next-auth-app-clerk-tau.vercel.app/
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)
  //console.log(wh)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  //const svix_signature = headerPayload.get('svix-signature') original

  // If there are no headers, error out
  //if (!svix_id || !svix_timestamp || !svix_signature) { original
  if (!svix_id || !svix_timestamp) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)
  //console.log(payload)
  //console.log(body)

  let evt

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      //'svix-signature': svix_signature, original
    }) 
    //console.log(evt)

  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data
  const eventType = evt.type
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
  console.log('Webhook payload:', body)



  // start =================================
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, first_name, last_name, image_url, email_addresses, username } =
      evt?.data;
    try {
      await createOrUpdateUser(
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
        username
      );
      return new Response('User is created or updated', {
        status: 200,
      });

    } catch (error) {
      console.log('Error creating or updating user:', error);
      return new Response('Error occured', {
        status: 400,
      });
    }
  }
  // end =====================================




  return new Response('Webhook received', { status: 200 })
}








