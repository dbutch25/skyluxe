"use client";

import { useEffect } from "react";

export default function ThankYouPage() {
  useEffect(() => {
    // Fire Google Ads conversion when page loads
    if (typeof window !== "undefined" && "gtag" in window) {
      (window as any).gtag("event", "conversion", {
        send_to: "AW-17526310370/", // replace with actual label
      });
    }

    // Optional: log stored GCLID for debugging
    const gclid = document.cookie.split("; ").find((row) => row.startsWith("gclid="))?.split("=")[1];
    console.log("Tracked GCLID:", gclid);
  }, []);

    return (
        <div className="flex flex-col justify-center items-center mx-auto min-h-screen px-4 py-0 text-center">
            <h1 className="text-3xl font-julius font-bold text-secondary-800">Thank You!</h1>
            <p className="mt-4 text-lg text-gray-700">
                Your request has been received. We’ll be in touch soon.
            </p>
        </div>
    );
}