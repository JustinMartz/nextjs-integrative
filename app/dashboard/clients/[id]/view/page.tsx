import { fetchClientById } from '@/app/lib/data';
import { Client } from '@/app/lib/definitions';
import EditClientForm from '@/app/ui/clients/edit-form';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const client: Client = await fetchClientById(id);

    return (
        <main>
            <h1>I am { client.first_name}</h1>
            {/* <EditClientForm client={client} /> */}
        </main>
    );
}