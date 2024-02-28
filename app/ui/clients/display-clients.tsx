import { fetchAllClients } from "@/app/lib/data";
import clsx from "clsx";
import { ClientField } from "@/app/lib/definitions";

export default async function DisplayClients({
  hideInactives, sortFirstName, sortLastName, sortSession
}: {
  hideInactives: string;
  sortFirstName: string;
  sortLastName: string;
  sortSession: string;
}) {
  let clients: ClientField[];
  clients = await fetchAllClients();

  if (sortFirstName === 'ascending') {
    clients.sort((a, b) => {
        if (a.first_name < b.first_name) return -1;
        if (a.first_name > b.first_name) return 1;
        return 0;
      });
  } else if (sortFirstName === 'descending') {
    clients.sort((a, b) => {
        if (a.first_name < b.first_name) return 1;
        if (a.first_name > b.first_name) return -1;
        return 0;
      });
  }

  if (sortLastName === 'descending') {
    clients.sort((a, b) => {
        if (a.last_name < b.last_name) return 1;
        if (a.last_name > b.last_name) return -1;
        return 0;
      });
  }

  if (sortSession === 'ascending') {
    clients.sort((a, b) => {
      if (a.start_time === "None recorded yet" && b.start_time === "None recorded yet") return 0;
      if (a.start_time === "None recorded yet") return 1; 
      if (b.start_time === "None recorded yet") return -1;
  
      const dateA = new Date(a.start_time);
      const dateB = new Date(b.start_time);
  
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return 0;
    });  
  } else if (sortSession === 'descending') {
    clients.sort((a, b) => {
        if (a.start_time === "None recorded yet" && b.start_time === "None recorded yet") return 0;
        if (a.start_time === "None recorded yet") return 1;
        if (b.start_time === "None recorded yet") return -1;

        const dateA = new Date(a.start_time);
        const dateB = new Date(b.start_time);
    
        if (dateA < dateB) return 1;
        if (dateA > dateB) return -1;
        return 0;
      }); 
  }
  
  return (
    <tbody>
      {clients.map((client: ClientField, i) => {
        return (
          <tr
            key={client.id}
            className={clsx("even:bg-gray-50 odd:bg-slate-100", {
              "collapse": client.active === false && !hideInactives,
              "text-red-300 ": client.active === false,
            })}
          >
            <td className="py-2">{client.first_name}</td>
            <td className="py-2">{client.last_name}</td>
            <td className="py-2">{client.start_time}</td>
          </tr>
        );
      })}
    </tbody>
  );
}
