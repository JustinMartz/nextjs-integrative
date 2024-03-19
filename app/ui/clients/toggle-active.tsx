'use client';
import styles from "@/app/ui/buttons.module.css";
import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function ToggleActive() {
    const [hideInactive, setHideInactive] = useState(true);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

  console.log('ToggleActive().hideInactive: ' + hideInactive);
  const handleChange = () => {
    setHideInactive(!hideInactive);
    const params = new URLSearchParams(searchParams);
    if (hideInactive) {
      params.set('hideInactives', 'false');
    } else {
      params.delete('hideInactives');
    }
    replace(`${pathname}?${params.toString()}`);  
  };

  return (
        <div className="flex items-center px-2 py-2 md:px-3 md:py-2 rounded-full shadow-md bg-white">
          <label htmlFor="active" className={styles.switch}>
          <input type="checkbox" id="active" name="active" checked={hideInactive} onChange={handleChange} />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
          <span className="ml-2">Hide inactives</span>
        </div>
  );
}

