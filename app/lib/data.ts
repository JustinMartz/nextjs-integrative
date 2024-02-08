import { sql } from '@vercel/postgres';
import {
    ClientField,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchCustomers() {
    try {
      const data = await sql<ClientField>`
        SELECT
          id,
          first_name,
          last_name,
          active
        FROM client
        ORDER BY last_name ASC
      `;
  
      const clients = data.rows;
      return clients;
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch all clients.');
    }
  }