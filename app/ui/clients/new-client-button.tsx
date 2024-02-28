import { UserPlusIcon } from "@heroicons/react/24/outline";

export default function NewClientButton() {
    return (
        <span className="flex items-center px-3 py-2 rounded-full shadow-md bg-white hover:cursor-pointer">
            <UserPlusIcon className="inline h-6 w-6"/>
            <p className="inline pl-2">New client</p>
        </span>
    );
}