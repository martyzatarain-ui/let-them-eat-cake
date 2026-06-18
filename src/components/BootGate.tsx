"use client";

import { useEffect, useState } from "react";
import BootScreen from "./BootScreen";

const BOOT_SESSION_KEY = "ltec_booted";

export default function BootGate({ children }: { children: React.ReactNode }) {
  const [booted, setBooted] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const alreadyBooted = sessionStorage.getItem(BOOT_SESSION_KEY);
    if (alreadyBooted) {
      setBooted(true);
    }
    setChecked(true);
  }, []);

  function handleDone() {
    sessionStorage.setItem(BOOT_SESSION_KEY, "1");
    setBooted(true);
  }

  if (!checked) {
    return <div className="min-h-screen bg-crt-black" />;
  }

  if (!booted) {
    return <BootScreen onDone={handleDone} />;
  }

  return <>{children}</>;
}
