"use client";

import { Loader2, Check } from "lucide-react";

interface SaveButtonProps {
  loading: boolean;
  saved: boolean;
  label?: string;
}

export default function SaveButton({ loading, saved, label = "Save Changes" }: SaveButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex items-center gap-2 px-6 py-2.5 bg-gray-800 text-white rounded-lg font-montserrat text-sm font-medium hover:bg-primary-800 transition-colors disabled:opacity-50"
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : saved ? (
        <Check size={16} className="text-green-400" />
      ) : null}
      {loading ? "Saving..." : saved ? "Saved!" : label}
    </button>
  );
}
