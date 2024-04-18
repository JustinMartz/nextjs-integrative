import NewClientForm from "@/app/ui/clients/new-client-form";
import { dmSerifDisplay } from "@/app/ui/fonts";

export default function Page() {
    return (
        <main className="min-h-fit flex flex-col -mt-6 -mx-3 md:mt-0 md:mx-0 px-2">
          <h1 className={`${dmSerifDisplay.className} mb-2 md:mb-4 text-xl md:text-2xl`}>
            Add New Client
          </h1>
          <div className="md:w-1/2 flex flex-col flex-1 max-h-full overflow-auto">
            <NewClientForm />
          </div>
        </main>
      );
}