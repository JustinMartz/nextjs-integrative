'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Reminder } from './definitions';

const ClientFormSchema = z.object({
    id: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    date_of_birth: z.coerce.date(),
    phone: z.string(),
    reminder_preference: z.coerce.number(),
    // status: z.boolean(),
    street: z.string(),
    unit: z.string(),
    city: z.string(),
    state: z.string(),
    postal: z.string()
  });

const UpdateClient = ClientFormSchema.omit({ id: true, date: true });

export async function updateClient(id: string, formData: FormData, url: string) {
    // TODO implement status
    const { 
        // clientId, 
        first_name, 
        last_name, 
        email,
        date_of_birth,
        phone,
        reminder_preference,
        // status,
        street,
        unit,
        city,
        state,
        postal } = UpdateClient.parse({
        id: formData.get('id'),
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        email: formData.get('email'),
        reminder_preference: formData.get('reminder_preference'),
        date_of_birth: formData.get('date_of_birth'),
        phone: formData.get('phone'),
        // status: formData.get('status'),
        street: formData.get('street'),
        unit: formData.get('unit'),
        city: formData.get('city'),
        state: formData.get('state'),
        postal: formData.get('postal_code')
      });

      const formattedDateOfBirth = date_of_birth.toDateString();

      console.log('going to db:')
      console.log('id: ' + id);
      console.log('first_name: ' + first_name);
      console.log('last_name: ' + last_name);
      console.log('email: ' + email);
      console.log('date of birth: ' + formattedDateOfBirth);
      console.log('reminder pref: ' + Reminder[reminder_preference]);

      try {
          await sql`
          UPDATE client
          SET first_name = ${first_name}, last_name = ${last_name}, email = ${email},
            phone = ${phone}, reminder_preference = ${reminder_preference}, date_of_birth = ${formattedDateOfBirth}
          WHERE id = ${id}
        `;
      } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to update client.");
      }
   
    revalidatePath(url);
}