import { fetchClientById } from "@/app/lib/data";
import { Client } from "@/app/lib/definitions";
import EditClientForm from "@/app/ui/clients/edit-form";
import { dmSerifDisplay } from "@/app/ui/fonts";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const client: Client = await fetchClientById(id);

  return (
    <main className="h-full bg-orange-50">
      <h1 className={`${dmSerifDisplay.className} mb-4 text-xl md:text-2xl`}>
        {client.first_name} {client.last_name}
      </h1>
      <div className="w-1/2">
        <EditClientForm client={client} />
      </div>
    </main>
  );
}
