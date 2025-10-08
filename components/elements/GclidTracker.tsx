"use client";

import { useEffect } from "react";

export default function GclidTracker() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const gclid = urlParams.get("gclid");
    if (gclid) {
      // Save GCLID for 90 days
      const expires = new Date();
      expires.setDate(expires.getDate() + 90);
      document.cookie = `gclid=${gclid}; expires=${expires.toUTCString()}; path=/`;
    }
  }, []);

  return null;
}
