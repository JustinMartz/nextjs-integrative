import { sql } from "@vercel/postgres";
import {
  UpcomingSession,
  ClientField,
  Appointment,
  UpcomingSessionRaw,
  RecentClientRaw,
  Client,
  Address,
} from "./definitions";
import { unstable_noStore as noStore } from "next/cache";
import { formatCurrency } from "./utils";

const { DateTime } = require("luxon");

export async function fetchFilteredClients(query: string) {
  noStore();
  try {
    const data = await sql<ClientField>`
    SELECT 
    client.id,
    client.first_name, 
    client.last_name,
    client.active, 
    appointment.start_time
FROM 
    client
LEFT JOIN 
    client_session ON client_session.client_id = client.id
LEFT JOIN 
    appointment ON appointment.id = client_session.appointment_id
WHERE client.first_name ILIKE ${`%${query}%`} OR
    client.last_name ILIKE ${`%${query}%`}
ORDER BY client.last_name ASC`;

    const clients = data.rows.map((client) => ({
      ...client,
      id: client.id,
      firstName: client.first_name,
      lastName: client.last_name,
      active: client.active,
      start_time: client.start_time
        ? new Date(client.start_time).toLocaleString("en-US", {
            dateStyle: "full",
          })
        : "None recorded yet",
    }));

    return clients;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all clients.");
  }
}

export async function fetchClientById(id: string): Promise<Client> {
  try {
    const data = await sql<Client>`
      SELECT
        client.id,
        client.first_name,
        client.last_name,
        client.email,
        client.address_id,
        client.phone,
        client.active,
        client.reminder_preference,
        client.date_of_birth
      FROM client
      WHERE client.id = ${id};
    `;

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch client.');
  }
}

export async function fetchAddressById(id: string): Promise<Address> {
  try {
    const data = await sql<Address>`
      SELECT
        address.id,
        address.unit,
        address.street,
        address.city,
        address.state,
        address.postal_code
      FROM address
      JOIN client ON address.id = client.address_id
      WHERE client.id = ${id};
    `;

    // console.log(data.rows[0]);
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch address.');
  }
}

export async function fetchAllClients() {
  noStore();
  try {
    const data = await sql<ClientField>`
    SELECT 
    client.id,
    client.first_name, 
    client.last_name,
    client.active, 
    appointment.start_time
FROM 
    client
LEFT JOIN 
    client_session ON client_session.client_id = client.id
LEFT JOIN 
    appointment ON appointment.id = client_session.appointment_id
ORDER BY client.last_name ASC`;

    const clients = data.rows.map((client) => ({
      ...client,
      id: client.id,
      firstName: client.first_name,
      lastName: client.last_name,
      active: client.active,
      start_time: client.start_time
        ? new Date(client.start_time).toLocaleString("en-US", {
            dateStyle: "full",
          })
        : "None recorded yet",
    }));

    return clients;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all clients.");
  }
}

export async function fetchCardData() {
  noStore();
  try {
    const invoiceSumPromise = sql`SELECT SUM(total) FROM invoice WHERE status='paid'`;
    const invoiceStatusPromise = sql`SELECT SUM(total) FROM invoice WHERE status='pending'`;
    const sessionHoursPromise = sql`SELECT 
      SUM(EXTRACT(EPOCH FROM (end_time - start_time)) / 3600) AS total_elapsed_hours
      FROM appointment
      JOIN client_session ON appointment.id = client_session.appointment_id
      WHERE date_trunc('week', start_time) = date_trunc('week', current_date)`;
    const clientCountPromise = sql`SELECT COUNT(*) FROM client WHERE active=true`;

    const data = await Promise.all([
      invoiceSumPromise,
      invoiceStatusPromise,
      sessionHoursPromise,
      clientCountPromise,
    ]);

    const ytdEarnings = formatCurrency(parseFloat(data[0].rows[0].sum ?? "0"));
    const totalPendingInvoices = formatCurrency(
      parseFloat(data[1].rows[0].sum ?? "0")
    );
    const sessionHours = Number(data[2].rows[0].total_elapsed_hours ?? "0");
    const numberOfClients = Number(data[3].rows[0].count ?? "0");

    return {
      ytdEarnings,
      totalPendingInvoices,
      sessionHours,
      numberOfClients,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

export async function fetchUpcomingSessions() {
  noStore();
  try {
    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<UpcomingSessionRaw>`
      SELECT appointment.id, start_time, end_time, 
        client.first_name || ' ' || client.last_name AS client_name 
      FROM appointment
      JOIN
        client ON appointment.client_id = client.id
      WHERE start_time > CURRENT_TIMESTAMP
      ORDER BY appointment.start_time ASC
      LIMIT 5`;

    const upcomingSessions = data.rows.map((session) => ({
      ...session,
      id: session.id,
      time: new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Denver",
        weekday: "long",
        month: "long",
        day: "numeric",
        hour12: true,
        hour: "numeric",
        minute: "numeric",
      }).format(new Date(session.start_time)),
      time_difference: calculateTimeDifference(new Date(session.start_time).toISOString()),
      client_name: session.client_name,
    }));

    return upcomingSessions;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest sessions.");
  }

  function calculateTimeDifference(sTime: string) {
    // const currentTime = new Date();
    const currentTime = DateTime.now().setZone('America/Denver');
    // const startTimeDate = new Date(startTime);
    const startTime = DateTime.fromISO(sTime, { zone: 'America/Denver' });
    console.log('currentTime: ' + currentTime.toISO());
    console.log('startTime: ' + startTime.toISO());
    console.log('***');

    const diff = startTime.diff(currentTime, ['days', 'hours', 'minutes']).toObject();
    let { days, hours, minutes } = diff;
    if (minutes !== 0 && minutes % 1 !== 0) {
      minutes = Math.ceil(minutes);
    }

    if (startTime.day > currentTime.day) {
      days = startTime.day - currentTime.day;
    }

    // // Calculate the difference in milliseconds
    // const differenceInMs = startTime.toUnixInteger() - currentTime.toUnixInteger();
    // console.log('difference in ms: ' + differenceInMs);

    // // Convert milliseconds to days, hours, and minutes
    // // const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    // const hours =
    //   Math.floor((differenceInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    // const minutes =
    //   Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60)) + 1;

    let timeDifferenceString = "";
    // const days = startTime.day - currentTime.day;

    console.log('=============');
    // console.log('session date: ' + startTime);
    // console.log('current date: ' + currentTime);
    console.log('days: ' + days);
    console.log('hours: ' + hours);
    console.log('minutes: ' + minutes);
    if (startTime.day > currentTime.day) {
      // console.log(
      //   "session is " +
      //     (startTime.getDay() - currentTime.getDay()) +
      //     "day ahead"
      // );
    }

    if (days > 1) {
      timeDifferenceString = `In ${days} day${days > 1 ? "s" : ""}`;
    } else if (days === 1) {
      timeDifferenceString = "Tomorrow";
    } else if (days === 0 && hours > 0) {
      timeDifferenceString =
        `In ${hours} hour${hours> 1 ? "s" : ""}` +
        `, ${minutes} minute${minutes > 1 ? "s" : ""}`;
    } else if (hours === 0 && minutes > 1) {
      timeDifferenceString = `In ${minutes} minute${minutes > 1 ? "s" : ""}`;      
    }

    return timeDifferenceString;
  }
}

export async function fetchRecentClients() {
  noStore();
  try {
    const data = await sql<RecentClientRaw>`
    SELECT 
    DISTINCT client.id, client.first_name || ' ' || client.last_name AS client_name, appointment.start_time,
      CASE WHEN note.id IS NOT NULL THEN TRUE ELSE FALSE END AS has_notes
    FROM client
    JOIN appointment ON client.id = appointment.client_id
    JOIN client_session ON appointment.id = client_session.appointment_id
    LEFT JOIN note ON client_session.id = note.session_id
    WHERE appointment.start_time < current_date
    ORDER BY appointment.start_time DESC
    LIMIT 5;`;

    const recentClients = data.rows.map((recentClient) => ({
      ...recentClient,
      id: recentClient.id,
      client_name: recentClient.client_name,
      last_seen: new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
      }).format(new Date(recentClient.start_time)),
      has_notes: recentClient.has_notes ? "yes" : "no",
    }));

    return recentClients;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch recent clients.");
  }
}
