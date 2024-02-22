const { db } = require("@vercel/postgres");
const {
  addresses,
  clients,
  providers,
  appointments,
  sessions,
  notes,
  invoices,
} = require("../app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

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
            postal_code VARCHAR(255) NOT NULL
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
      })
    );

    console.log(`Seeded ${insertedAddresses.length} addresses`);

    return {
      createTable,
      addresses: insertedAddresses,
    };
  } catch (error) {
    console.error("Error seeding addresses:", error);
    throw error;
  }
}

async function seedProviders(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "provider" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS provider (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        password TEXT NOT NULL,
        privelege INTEGER,
        practice_name VARCHAR(255)
      );
    `;

    console.log(`Created "provider" table`);

    // Insert data into the "provider" table
    const insertedProviders = await Promise.all(
      providers.map(async (provider) => {
        const hashedPassword = await bcrypt.hash(provider.password, 10);
        return client.sql`
        INSERT INTO provider (id, email, first_name, last_name, password, privelege, practice_name)
        VALUES (${provider.id}, ${provider.email}, ${provider.firstName}, ${provider.lastName}, ${hashedPassword}, ${provider.privelege},
            ${provider.practiceName})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedProviders.length} providers`);

    return {
      createTable,
      providers: insertedProviders,
    };
  } catch (error) {
    console.error("Error seeding providers:", error);
    throw error;
  }
}

async function seedClients(dbClient) {
  try {
    await dbClient.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "client" table if it doesn't exist
    const createTable = await dbClient.sql`
      CREATE TABLE IF NOT EXISTS client (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        address_id UUID REFERENCES address(id),
        phone VARCHAR(255),
        active BOOL DEFAULT 't',
        reminder_preference INTEGER,
        date_of_birth DATE
      );
    `;

    console.log(`Created "client" table`);

    // Insert data into the "client" table
    const insertedClients = await Promise.all(
      clients.map(
        (client) => dbClient.sql`
        INSERT INTO client (id, first_name, last_name, email, address_id, phone, active, reminder_preference, date_of_birth)
        VALUES (${client.id}, ${client.firstName}, ${client.lastName}, ${client.email}, ${client.addressId},
        ${client.phone}, ${client.active}, ${client.reminderPreference}, ${client.dateOfBirth})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedClients.length} clients`);

    return {
      createTable,
      clients: insertedClients,
    };
  } catch (error) {
    console.error("Error seeding clients:", error);
    throw error;
  }
}

async function seedAppointments(dbClient) {
  try {
    await dbClient.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "client" table if it doesn't exist
    const createTable = await dbClient.sql`
      CREATE TABLE IF NOT EXISTS appointment (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        start_time TIMESTAMP WITH TIME ZONE NOT NULL,
        end_time TIMESTAMP WITH TIME ZONE NOT NULL,
        client_id UUID REFERENCES client(id) NOT NULL
      );
    `;

    console.log(`Created "appointment" table`);

    // Insert data into the "appointment" table
    const insertedAppointments = await Promise.all(
      appointments.map(
        (appointment) => dbClient.sql`
        INSERT INTO appointment (id, start_time, end_time, client_id)
        VALUES (${appointment.id}, ${appointment.startTime}, ${appointment.endTime}, ${appointment.clientId})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedAppointments.length} appointments`);

    return {
      createTable,
      appointments: insertedAppointments,
    };
  } catch (error) {
    console.error("Error seeding appointments:", error);
    throw error;
  }
}

async function seedSessions(dbClient) {
  try {
    await dbClient.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "client_session" table if it doesn't exist
    const createTable = await dbClient.sql`
      CREATE TABLE IF NOT EXISTS client_session (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        provider_id UUID REFERENCES provider(id) NOT NULL,
        client_id UUID REFERENCES client(id) NOT NULL,
        appointment_id UUID REFERENCES appointment(id) NOT NULL,
        location_id TEXT,
        rate INTEGER
      );
    `;

    console.log(`Created "client_session" table`);

    // Insert data into the "client_session" table
    const insertedSessions = await Promise.all(
      sessions.map(
        (session) => dbClient.sql`
        INSERT INTO client_session (id, provider_id, client_id, appointment_id, location_id, rate)
        VALUES (${session.id}, ${session.provider_id}, ${session.client_id}, ${session.appointment_id},
          ${session.location_id}, ${session.rate})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedSessions.length} sessions`);

    return {
      createTable,
      sessions: insertedSessions,
    };
  } catch (error) {
    console.error("Error seeding sessions:", error);
    throw error;
  }
}

async function seedNotes(dbClient) {
  try {
    await dbClient.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "note" table if it doesn't exist
    const createTable = await dbClient.sql`
      CREATE TABLE IF NOT EXISTS note (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        provider_id UUID REFERENCES provider(id) NOT NULL,
        client_id UUID REFERENCES client(id) NOT NULL,
        session_id UUID REFERENCES client_session(id) NOT NULL,
        note_text TEXT
      );
    `;

    console.log(`Created "note" table`);

    // Insert data into the "note" table
    const insertedNotes = await Promise.all(
      notes.map(
        (note) => dbClient.sql`
        INSERT INTO note (id, provider_id, client_id, session_id, note_text)
        VALUES (${note.id}, ${note.provider_id}, ${note.client_id}, ${note.session_id}, ${note.note_text})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedNotes.length} notes`);

    return {
      createTable,
      notes: insertedNotes,
    };
  } catch (error) {
    console.error("Error seeding notes:", error);
    throw error;
  }
}

async function seedInvoices(dbClient) {
  try {
    await dbClient.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoice" table if it doesn't exist
    const createTable = await dbClient.sql`
      CREATE TABLE IF NOT EXISTS invoice (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        provider_id UUID REFERENCES provider(id) NOT NULL,
        client_id UUID REFERENCES client(id) NOT NULL,
        session_id UUID REFERENCES client_session(id) NOT NULL,
        total INTEGER NOT NULL,
        status VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "invoice" table`);

    // Insert data into the "invoice" table
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => dbClient.sql`
        INSERT INTO invoice (id, provider_id, client_id, session_id, total, status)
        VALUES (${invoice.id}, ${invoice.provider_id}, ${invoice.client_id}, ${invoice.session_id}, ${invoice.total}, 
          ${invoice.status})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error("Error seeding notes:", error);
    throw error;
  }
}

async function dropAllTables(dbClient) {
  // note
  try {
    await dbClient.sql`DROP TABLE IF EXISTS note`;
  } catch (error) {
    console.error("Error dropping note table:", error);
    throw error;
  }

  // invoice
  try {
    await dbClient.sql`DROP TABLE IF EXISTS invoice`;
  } catch (error) {
    console.error("Error dropping invoice table:", error);
    throw error;
  }

  // client_session
  try {
    await dbClient.sql`DROP TABLE IF EXISTS client_session`;
  } catch (error) {
    console.error("Error dropping client_session table:", error);
    throw error;
  }

  // appointment
  try {
    await dbClient.sql`DROP TABLE IF EXISTS appointment`;
  } catch (error) {
    console.error("Error dropping appointment table:", error);
    throw error;
  }

  // client
  try {
    await dbClient.sql`DROP TABLE IF EXISTS client`;
  } catch (error) {
    console.error("Error dropping client table:", error);
    throw error;
  }

  // provider
  try {
    await dbClient.sql`DROP TABLE IF EXISTS provider`;
  } catch (error) {
    console.error("Error dropping appointment provider:", error);
    throw error;
  }

  // address
  try {
    await dbClient.sql`DROP TABLE IF EXISTS address`;
  } catch (error) {
    console.error("Error dropping address table:", error);
    throw error;
  }
}

async function main() {
  const dbClient = await db.connect();

  await dropAllTables(dbClient);
  await seedAddresses(dbClient);
  await seedProviders(dbClient);
  await seedClients(dbClient);
  await seedAppointments(dbClient);
  await seedSessions(dbClient);
  await seedNotes(dbClient);
  await seedInvoices(dbClient);

  await dbClient.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
