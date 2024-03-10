'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Reminder } from './definitions';

const ClientFormSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    dateOfBirth: z.coerce.date(),
    phone: z.string(),
    reminderPreference: z.coerce.number(),
    // status: z.boolean(),
    street: z.string(),
    unit: z.string(),
    city: z.string(),
    state: z.string(),
    postal: z.string()
  });

const UpdateClient = ClientFormSchema.omit({ id: true, date: true });

export async function updateClient(id: string, formData: FormData) {
    // TODO implement status
    const { 
        // clientId, 
        firstName, 
        lastName, 
        email,
        dateOfBirth,
        phone,
        reminderPreference,
        // status,
        street,
        unit,
        city,
        state,
        postal } = UpdateClient.parse({
        clientId: formData.get('id'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        reminderPreference: formData.get('reminderPreference'),
        dateOfBirth: formData.get('dateOfBirth'),
        phone: formData.get('phone'),
        // status: formData.get('status'),
        street: formData.get('street'),
        unit: formData.get('unit'),
        city: formData.get('city'),
        state: formData.get('state'),
        postal: formData.get('postalCode')
      });

      console.log('going to db:')
      console.log('id: ' + id);
      console.log('first_name: ' + firstName);
      console.log('last_name: ' + lastName);
      console.log('email: ' + email);
      console.log('date of birth: ' + dateOfBirth);
      console.log('reminder pref: ' + Reminder[reminderPreference]);

    //   await sql`
    //   UPDATE client
    //   SET first_name = ${firstName}, last_name = ${lastName}, email = ${email},
    //     reminder_preference = ${reminderPreference}
    //   WHERE id = ${id}
    // `;
   
    revalidatePath('/dashboard/clients');
    redirect('/dashboard/clients');
}