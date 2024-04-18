import ToggleActive from "@/app/ui/clients/toggle-active";
import { dmSerifDisplay } from "@/app/ui/fonts";
import ClientSearch from "@/app/ui/search";
import DisplayClients from "@/app/ui/clients/display-clients";
import FirstNameSortToggle from "@/app/ui/clients/firstname-toggle";
import LastNameSortToggle from "@/app/ui/clients/lastname-toggle";
import LastSeenSortToggle from "@/app/ui/clients/last-seen-toggle";
import NewClientButton from "@/app/ui/clients/new-client-button";
import Link from "next/link";
import { DisplayClientsSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    hideInactives?: string;
    sortFirstName?: string;
    sortLastName?: string;
    sortSession?: string;
    query?: string;
    page?: string;
  };
}) {
  const hideInactives = searchParams?.hideInactives || "";
  const sortFirstName = searchParams?.sortFirstName || "";
  const sortLastName = searchParams?.sortLastName || "";
  const sortSession = searchParams?.sortSession || "";
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <main className="h-lvh md:h-full -mt-6 md:mt-0">
      <h1 className={`${dmSerifDisplay.className} mb-4 text-xl md:text-2xl`}>
        <Link href="/dashboard/clients">Clients</Link>
      </h1>
      <div className="w-full flex flex-col md:flex-row gap-y-2 rounded-xl bg-gray-50 md:p-4 md:mb-4 p-2 mb-2">
        <ClientSearch />
        <div className="flex justify-between md:w-1/2 md:justify-start gap-x-4">
          <Link href='clients/add'><NewClientButton /></Link>
          <ToggleActive />
        </div>
      </div>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <table className="table-fixed">
          <thead>
            <tr>
              <th className="w-1/4 md:w-1/4 pb-4">
                <FirstNameSortToggle />
              </th>
              <th className="w-1/4 md:w-1/4 pb-4">
                <LastNameSortToggle />
              </th>
              <th className="w-1/2 md:w-1/2 pb-4">
                <LastSeenSortToggle />
              </th>
            </tr>
          </thead>
          <Suspense fallback={<DisplayClientsSkeleton />}>
            <DisplayClients
              hideInactives={hideInactives}
              sortFirstName={sortFirstName}
              sortLastName={sortLastName}
              sortSession={sortSession}
              query={query}
            />
          </Suspense>
        </table>
      </div>
    </main>
  );
}
