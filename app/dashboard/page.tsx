import { dmSerifDisplay } from "../ui/fonts";
import UpcomingSessions from "../ui/dashboard/upcoming-sessions";

export default async function Page() {
    return (
        <main className="h-full">
            <h1 className={`${dmSerifDisplay.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
            <UpcomingSessions />
        </main>
    );
}