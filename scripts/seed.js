import { db } from '@vercel/postgres';
import { clients, users } from '../app/lib/placeholder-data.js';
import { hash } from 'bcrypt';

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
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
