"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Reminder } from "./definitions";

const ClientFormSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  date_of_birth: z.date(),
  phone: z.string(),
  reminder_preference: z.coerce.number(),
  // status: z.boolean(),
  street: z.string(),
  unit: z.string(),
  city: z.string(),
  state: z.string(),
  postal: z.string(),
});

const UpdateClient = ClientFormSchema;
const CreateClient = ClientFormSchema.omit({ id: true });

export async function updateClient(
  id: string,
  formData: FormData,
  url: string
) {
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
    postal,
  } = UpdateClient.parse({
    id: formData.get("id"),
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),
    reminder_preference: formData.get("reminder_preference"),
    date_of_birth: formData.get("date_of_birth"),
    phone: formData.get("phone"),
    // status: formData.get('status'),
    street: formData.get("street"),
    unit: formData.get("unit"),
    city: formData.get("city"),
    state: formData.get("state"),
    postal: formData.get("postal_code"),
  });

  const formattedDateOfBirth = date_of_birth.toDateString();

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

export async function createClient(formData: FormData) {
  const rawFormData = {
    firstName: formData.get("first_name"),
    lastName: formData.get("last_name"),
    email: formData.get("email"),
    dateOfBirth: formData.get("date_of_birth"),
    phone: formData.get("phone"),
    street: formData.get("street"),
    unit: formData.get("unit"),
    city: formData.get("city"),
    state: formData.get("state"),
    postalCode: formData.get("postal_code"),
    reminderPreference: formData.get("reminder_preference"),
  };

  const dobInput = formData.get('date_of_birth');
  if (typeof dobInput !== 'string' || dobInput === '') {
    throw new Error("Date of birth is required and must be a valid string.");
  }
  
  const dobDate = new Date(dobInput);
  if (isNaN(dobDate.getTime())) {
    throw new Error("Invalid date format");
  }

  const {
    first_name,
    last_name,
    email,
    date_of_birth,
    phone,
    street,
    unit,
    city,
    state,
    postal,
    reminder_preference,
  } = CreateClient.parse({
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),
    date_of_birth: dobDate,
    phone: formData.get("phone"),
    street: formData.get("street"),
    unit: formData.get("unit"),
    city: formData.get("city"),
    state: formData.get("state"),
    postal: formData.get("postal_code"),
    reminder_preference: formData.get("reminder_preference"),
  });

  const result = await sql`
  INSERT INTO address (street, unit, city, state, postal_code)
  VALUES (${street}, ${unit}, ${city}, ${state}, ${postal})
  RETURNING id
  `;

  const addressId = result.rows[0].id;

  try {
    await sql`
      INSERT INTO client (first_name, last_name, email, address_id, phone, active, reminder_preference, date_of_birth)
      VALUES (${first_name}, ${last_name}, ${email}, ${addressId}, ${phone}, ${true}, ${reminder_preference}, ${date_of_birth.toISOString().slice(0, 10)})
    `;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create client."); 
  }

  revalidatePath("/dashboard/clients");
  redirect("/dashboard/clients");
}
