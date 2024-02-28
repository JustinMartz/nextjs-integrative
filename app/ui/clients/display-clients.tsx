import { fetchAllActiveClients, fetchAllClients } from "@/app/lib/data";
import clsx from "clsx";
import { ClientField } from "@/app/lib/definitions";
import { ToggleActiveProps } from "@/app/ui/clients/toggle-active";

// export default async function DisplayClients({ clients }: { clients: ClientField[] }) {
export default async function DisplayClients({
  hideInactives,
}: {
  hideInactives: string;
}) {
  let clients: ClientField[];
  clients = await fetchAllClients();

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
