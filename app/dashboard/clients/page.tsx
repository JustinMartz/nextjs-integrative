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
    <main className="h-full">
      <h1 className={`${dmSerifDisplay.className} mb-4 text-xl md:text-2xl`}>
        <Link href="/dashboard/clients">Clients</Link>
      </h1>
      <div className="flex w-full rounded-xl bg-gray-50 p-4 mb-4">
        <ClientSearch />
        <div className="flex w-1/2 justify-start gap-x-4">
          <NewClientButton />
          <ToggleActive />
        </div>
      </div>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <table className="table-fixed">
          <thead>
            <tr>
              <th className="w-1/4 pb-4">
                <FirstNameSortToggle />
              </th>
              <th className="w-1/4 pb-4">
                <LastNameSortToggle />
              </th>
              <th className="w-1/2 pb-4">
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
