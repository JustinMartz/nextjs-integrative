import { db } from '@vercel/postgres';
import { clients, users, addresses } from '../app/lib/placeholder-data.js';
import { hash } from 'bcrypt';

async function seedAddresses(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "address" table if it doesn't exist
        const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS address (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            street VARCHAR(255) NOT NULL,
            unit VARCHAR(255),
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            postal_code VARCHAR(255) NOT NULL,
          );
        `;
    
        console.log(`Created "address" table`);
    
        // Insert data into the "address" table
        const insertedAddresses = await Promise.all(
          addresses.map(async (address) => {
            return client.sql`
            INSERT INTO address (id, street, unit, city, state, postal_code)
            VALUES (${address.id}, ${address.street}, ${address.unit}, ${address.city}, ${address.state}, 
                ${address.postalCode})
            ON CONFLICT (id) DO NOTHING;
          `;
          }),
        );
    
        console.log(`Seeded ${insertedAddresses.length} addresses`);
    
        return {
          createTable,
          addresses: insertedAddresses,
        };
      } catch (error) {
        console.error('Error seeding addresses:', error);
        throw error;
      }   
}

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "user" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS user (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        password TEXT NOT NULL,
        privelege INTEGER,
        practice_name VARCHAR(255)
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, email, first_name, last_name, password, privelege, practice_name)
        VALUES (${user.id}, ${user.email}, ${user.firstName}, ${user.lastName}, ${hashedPassword}, ${user.privelege},
            ${user.practiceName})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedClients(dbClient) {
  try {
    await dbClient.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await dbClient.sql`
      CREATE TABLE IF NOT EXISTS client (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "client" table`);

    // Insert data into the "client" table
    const insertedClients = await Promise.all(
      clients.map(
        (client) => dbClient.sql`
        INSERT INTO client (id, firstName, ,lastName, email, dateOfBirth)
        VALUES (${client.id}, ${client.firstName}, ${client.lastName}, ${client.email}, ${client.dateOfBirth})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedClients.length} clients`);

    return {
      createTable,
      clients: insertedClients,
    };
  } catch (error) {
    console.error('Error seeding clients:', error);
    throw error;
  }
}

async function main() {
  const dbClient = await db.connect();

  await seedAddresses(dbClient);
  await seedUsers(dbClient);
  await seedClients(dbClient);

  await dbClient.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
