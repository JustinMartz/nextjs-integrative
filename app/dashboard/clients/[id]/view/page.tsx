import { fetchAddressById, fetchClientById } from "@/app/lib/data";
import EditClientForm from "@/app/ui/clients/edit-form";
import { dmSerifDisplay } from "@/app/ui/fonts";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [client, address] = await Promise.all([
    fetchClientById(id),
    fetchAddressById(id),
  ]);

  return (
    <main className="h-full flex flex-col">
      <h1 className={`${dmSerifDisplay.className} mb-4 text-xl md:text-2xl`}>
        {client.first_name} {client.last_name}
      </h1>
      <div className="w-1/2 flex flex-col flex-1 max-h-full overflow-auto">
        <EditClientForm client={client} address={address}/>
      </div>
    </main>
  );
}
