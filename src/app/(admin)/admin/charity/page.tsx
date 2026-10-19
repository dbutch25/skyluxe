"use client";

/** Homepage charity spotlight (single record). */

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import { AdminSection, Hint, SaveBar, TextField } from "@/components/admin/Fields";

interface CharityForm {
  enabled: boolean;
  label: string;
  title: string;
  body: string;
  imageUrl: string;
  imageAlt: string;
  nextEvent: string;
  raisedToDate: string;
  venue: string;
  causeTitle: string;
  causeBody: string;
  recapLink: string;
  donateLink: string;
}

// Starting text from the approved design; placeholders left blank
const defaults: CharityForm = {
  enabled: true,
  label: "Annual Charity Golf Tournament",
  title: "Construction Masters Charity Golf Tournament",
  body:
    "Every year, the construction trades trade hard hats for golf clubs. Hosted by construction workers through Construction Masters Charity, the tournament raises funds to sponsor a family room at Ronald McDonald House — giving families a place to stay close to their child in hospital. Skyluxe is proud to be part of it.",
  imageUrl: "",
  imageAlt: "",
  nextEvent: "",
  raisedToDate: "",
  venue: "",
  causeTitle: "A Ronald McDonald House family room",
  causeBody: "Tournament proceeds sponsor a room for families with a child receiving care.",
  recapLink: "",
  donateLink: "",
};

export default function CharityAdminPage() {
  const [form, setForm] = useState<CharityForm>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/cms/charity")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) {
          // DB nulls → empty strings for the inputs
          const clean = Object.fromEntries(
            Object.entries(data).map(([k, v]) => [k, v ?? ""])
          ) as Partial<CharityForm>;
          setForm((f) => ({ ...f, ...clean, enabled: !!data.enabled }));
        }
        setLoading(false);
      });
  }, []);

  const set = <K extends keyof CharityForm>(key: K, value: CharityForm[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const save = async () => {
    setSaving(true);
    setError(null);
    const res = await fetch("/api/cms/charity", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      const linkError =
        data?.details?.fieldErrors?.recapLink?.[0] ?? data?.details?.fieldErrors?.donateLink?.[0];
      setError(
        res.status === 400
          ? linkError ?? "Title and description are required."
          : "Could not save. Please try again."
      );
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  if (loading) return <p className="text-sm text-gray-400 font-montserrat">Loading…</p>;

  return (
    <div className="max-w-4xl space-y-6 pb-24">
      <div>
        <h1 className="text-3xl font-julius text-primary-950">Charity Spotlight</h1>
        <p className="text-sm text-gray-500 font-montserrat mt-1">
          The dark feature card in the homepage &ldquo;Latest News &amp; Updates&rdquo; section.
        </p>
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 text-xs text-secondary-700 hover:text-secondary-900 font-montserrat mt-2"
        >
          View on homepage <ExternalLink size={12} />
        </Link>
      </div>

      <AdminSection title="Visibility">
        <label className="flex items-center gap-3 font-montserrat text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={form.enabled}
            onChange={(e) => set("enabled", e.target.checked)}
            className="h-4 w-4"
          />
          Show the charity spotlight on the homepage
        </label>
      </AdminSection>

      <AdminSection title="Content">
        <div className="space-y-4">
          <TextField label="Small heading" value={form.label} onChange={(v) => set("label", v)} />
          <TextField label="Title" value={form.title} onChange={(v) => set("title", v)} />
          <TextField label="Description" value={form.body} onChange={(v) => set("body", v)} rows={5} />
        </div>
      </AdminSection>

      <AdminSection title="Photo" help="Fills the left half of the card on desktop. A tournament photo works well.">
        <ImageUpload value={form.imageUrl} onChange={(v) => set("imageUrl", v)} folder="skyluxe/charity" />
        <input
          value={form.imageAlt}
          onChange={(e) => set("imageAlt", e.target.value)}
          placeholder="Alt text (describe the image for SEO & accessibility)"
          className="mt-2 w-full px-3 py-1.5 border rounded text-sm font-montserrat"
        />
        {form.imageUrl && (
          <button
            type="button"
            onClick={() => set("imageUrl", "")}
            className="mt-2 text-xs text-red-500 hover:text-red-700 font-montserrat"
          >
            Remove photo
          </button>
        )}
      </AdminSection>

      <AdminSection title="Key details" help="Shown as three boxes. Leave any of them empty to hide it.">
        <div className="grid sm:grid-cols-3 gap-4">
          <TextField label="Next event" value={form.nextEvent} onChange={(v) => set("nextEvent", v)} placeholder="June 12, 2027" />
          <TextField label="Raised to date" value={form.raisedToDate} onChange={(v) => set("raisedToDate", v)} placeholder="$48,000" />
          <TextField label="Golf club" value={form.venue} onChange={(v) => set("venue", v)} placeholder="Club name" />
        </div>
      </AdminSection>

      <AdminSection title="The cause" help="The highlighted box under the details. Leave both empty to hide it.">
        <div className="space-y-4">
          <TextField label="Heading" value={form.causeTitle} onChange={(v) => set("causeTitle", v)} />
          <TextField label="Text" value={form.causeBody} onChange={(v) => set("causeBody", v)} rows={3} />
        </div>
      </AdminSection>

      <AdminSection title="Buttons" help="Leave a link empty to hide that button.">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <TextField label="“Tournament Recap” link" value={form.recapLink} onChange={(v) => set("recapLink", v)} placeholder="/news/charity-golf-2026" />
            <Hint>Tip: write a news post about the tournament and link to it here.</Hint>
          </div>
          <div>
            <TextField label="“Support the Cause” link" value={form.donateLink} onChange={(v) => set("donateLink", v)} placeholder="https://…" />
            <Hint>Full links open in a new tab.</Hint>
          </div>
        </div>
      </AdminSection>

      {error && <p className="text-sm text-red-600 font-montserrat bg-red-50 rounded-lg px-3 py-2">{error}</p>}

      <SaveBar saving={saving} saved={saved} onSave={save} />
    </div>
  );
}
