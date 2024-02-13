import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { dmSerifDisplay } from '@/app/ui/fonts';
import { fetchUpcomingSessions } from '@/app/lib/data';

export default async function UpcomingSessions() {
  const upcomingSessions = await fetchUpcomingSessions();
  
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${dmSerifDisplay.className} mb-4 text-xl md:text-2xl`}>
        Upcoming Sessions
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">

        <div className="bg-white px-6">
          {upcomingSessions.map((session, i) => {
            return (
              <div
                key={session.id}
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
                      {session.time}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {session.time_difference}
                    </p>
                  </div>
                </div>
                <p
                  className={`${dmSerifDisplay.className} truncate text-sm font-medium md:text-base`}
                >
                  {session.client_name}
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
