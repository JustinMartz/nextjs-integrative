import { dmSerifDisplay } from "../ui/fonts";

export default async function Page() {
    return (
        <main className="h-full bg-orange-200">
            <h1 className={`${dmSerifDisplay.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
        </main>
    );
}