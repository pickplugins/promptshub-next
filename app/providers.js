"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import * as fbq from "../lib/fpixel";

export default function Providers({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    fbq.pageview();
  }, [pathname]);

  return <>{children}</>;
}
