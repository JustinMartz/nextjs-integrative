'use client';

import { dmSerifDisplay } from "@/app/ui/fonts";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function FirstNameSortToggle() {
  const toggleFirstNameSort = () => {
    alert("Sorting by first name")
  };

  return (
    <div className="flex items-center">
      <h2 className={`${dmSerifDisplay.className} text-xl md:text-xl`}>
        First Name
      </h2>
      <span className="pointer-events-none inset-y-0 right-0 flex items-center pr-2">
        <ChevronUpDownIcon
          className="h-6 w-6 text-gray-400 hover:text-gray-500 hover:cursor-pointer pointer-events-auto"
          onClick={toggleFirstNameSort}
          // TODO: aria label for icon
        />
      </span>
    </div>
  );
}
