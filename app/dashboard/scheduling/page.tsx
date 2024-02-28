'use client';

import { useState } from "react";

export default function Page() {
    const [hideInactive, setHideInactive] = useState(false);
    console.log('scheduling page - hideInactive: ' + hideInactive);

    const handleChange = () => {
        console.log('in handleChange()');
        setHideInactive(!hideInactive);
      };

    return (
        // <p>Scheduling page</p>
        <input className="pointer-events-auto" type="checkbox" id="active" name="active" checked={hideInactive} onChange={handleChange} />
    )
}