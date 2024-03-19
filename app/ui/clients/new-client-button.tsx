import { UserPlusIcon } from "@heroicons/react/24/outline";

export default function NewClientButton() {
    return (
        <span className="flex items-center px-2 py-2 md:px-3 md:py-2 rounded-full shadow-md bg-white hover:cursor-pointer">
            <UserPlusIcon className="inline h-5 w-5 md:h-6 md:w-6"/>
            <p className="inline text-sm md:text-base pl-2">New client</p>
        </span>
    );
}