import { dmSerifDisplay } from "../../ui/fonts";
import UpcomingSessions from "../../ui/dashboard/upcoming-sessions";
import RecentClients from "../../ui/dashboard/recent-clients";
import CardWrapper from "../../ui/dashboard/cards";
import { Suspense } from "react";
import {
  UpcomingSessionsSkeleton,
  RecentClientsSkeleton,
  CardsSkeleton,
} from "@/app/ui/skeletons";

export default async function Page() {
  return (
    <main className="h-full">
      <h1 className={`${dmSerifDisplay.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<UpcomingSessionsSkeleton />}>
          <UpcomingSessions />
        </Suspense>
        <Suspense fallback={<RecentClientsSkeleton />}>
          <RecentClients />
        </Suspense>
      </div>
    </main>
  );
}
