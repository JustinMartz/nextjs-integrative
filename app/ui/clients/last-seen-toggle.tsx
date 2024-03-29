"use client";

import { dmSerifDisplay } from "@/app/ui/fonts";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function LastSeenSortToggle() {
  const [sort, setSort] = useState(true);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const toggleLastSeenSort = () => {
    setSort(!sort);
    const params = new URLSearchParams(searchParams);
    const currentSortOrder = params.get("sortSession");

    if (sort) {
      params.set("sortSession", "descending");
    } else {
      params.set("sortSession", "ascending");
    }

    if (!currentSortOrder) {
      params.set("sortSession", "descending");
    }

    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex items-center">
      <h2 className={`${dmSerifDisplay.className} text-lg md:text-xl`}>
        Last Session
      </h2>
      <span className="pointer-events-none inset-y-0 right-0 flex items-center pr-2">
        <ChevronUpDownIcon
          className="h-6 w-6 text-gray-400 hover:text-gray-500 hover:cursor-pointer pointer-events-auto"
          onClick={toggleLastSeenSort}
          // TODO: aria label for icon
        />
      </span>
    </div>
  );
}
