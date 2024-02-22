import { fetchRecentClients } from "@/app/lib/data";
import { dmSerifDisplay } from "../fonts";
import clsx from "clsx";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import NoteStatus from "../sessions/status";

export default async function RecentClients() {
    const recentClients = await fetchRecentClients();

    return (
        <div className="flex w-full flex-col md:col-span-4">
          <h2 className={`${dmSerifDisplay.className} mb-4 text-xl md:text-2xl`}>
            Recent Clients
          </h2>
          <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
    
            <div className="bg-white px-6">
              {recentClients.map((recentClient, i) => {
                return (
                  <div
                    key={recentClient.id}
                    className={clsx(
                      'flex flex-row items-center justify-between py-4',
                      {
                        'border-t': i !== 0,
                      },
                    )}
                  >
                    <div className="flex items-center">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold md:text-base">
                          {recentClient.client_name}
                        </p>
                        <p className="hidden text-sm text-gray-500 sm:block">Last session:&nbsp;
                          {recentClient.last_seen}
                        </p>
                      </div>
                    </div>
                    <p
                      className={`${dmSerifDisplay.className} truncate text-sm font-medium md:text-base`}
                    >
                    <NoteStatus status={recentClient.has_notes} />
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center pb-2 pt-6">
              <ArrowPathIcon className="h-5 w-5 text-gray-500" />
              <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
            </div>
          </div>
        </div>
      );
}