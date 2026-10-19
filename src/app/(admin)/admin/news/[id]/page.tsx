"use client";

/** Post editor. /admin/news/new creates a post; /admin/news/<id> edits one. */

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { AdminSection, Hint, SelectField, TextField } from "@/components/admin/Fields";
import { POST_CATEGORIES } from "@/lib/schemas";
import { slugify } from "@/lib/utils";

interface PostForm {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: object | null;
  coverImageUrl: string;
  coverImageAlt: string;
  published: boolean;
  publishedDate: string; // YYYY-MM-DD for the date input
}

const empty: PostForm = {
  title: "",
  slug: "",
  category: "Project Update",
  excerpt: "",
  content: null,
  coverImageUrl: "",
  coverImageAlt: "",
  published: false,
  publishedDate: "",
};

const MAX_EXCERPT = 300;

/** Date input value → ISO string at noon local time (avoids timezone day shifts). */
const toIso = (d: string) => (d ? new Date(`${d}T12:00:00`).toISOString() : null);

/** ISO string → YYYY-MM-DD in local time. */
function toDateInput(iso: string | null | undefined) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function PostEditorPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const isNew = id === "new";

  const [form, setForm] = useState<PostForm>(empty);
  const [loading, setLoading] = useState(!isNew);
  const [slugEdited, setSlugEdited] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isNew) return;
    fetch(`/api/cms/posts/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((p) => {
        if (p) {
          setForm({
            title: p.title,
            slug: p.slug,
            category: p.category,
            excerpt: p.excerpt,
            content: p.content ?? null,
            coverImageUrl: p.coverImageUrl ?? "",
            coverImageAlt: p.coverImageAlt ?? "",
            published: p.published,
            publishedDate: toDateInput(p.publishedAt),
          });
        } else {
          setError("Post not found.");
        }
        setLoading(false);
      });
  }, [id, isNew]);

  const set = <K extends keyof PostForm>(key: K, value: PostForm[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const save = async (publish?: boolean) => {
    setSaving(true);
    setError(null);
    const published = publish ?? form.published;

    const body = {
      title: form.title,
      slug: slugify(form.slug),
      category: form.category,
      excerpt: form.excerpt,
      content: form.content,
      coverImageUrl: form.coverImageUrl,
      coverImageAlt: form.coverImageAlt,
      published,
      publishedAt: toIso(form.publishedDate),
    };

    const res = await fetch(isNew ? "/api/cms/posts" : `/api/cms/posts/${id}`, {
      method: isNew ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(
        res.status === 409
          ? data?.error ?? "That URL slug is taken."
          : res.status === 400
          ? "Some fields are missing or invalid. Title, URL slug and summary are required."
          : "Could not save. Please try again."
      );
      return;
    }

    const savedPost = await res.json();
    setForm((f) => ({ ...f, published, publishedDate: toDateInput(savedPost.publishedAt) }));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
    if (isNew) router.replace(`/admin/news/${savedPost.id}`);
  };

  if (loading) return <p className="text-sm text-gray-400 font-montserrat">Loading…</p>;

  return (
    <div className="max-w-4xl space-y-6 pb-24">
      <div>
        <Link
          href="/admin/news"
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary-950 font-montserrat mb-3"
        >
          <ArrowLeft size={12} /> All posts
        </Link>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-julius text-primary-950">{isNew ? "New Post" : "Edit Post"}</h1>
          {!isNew && form.published && (
            <Link
              href={`/news/${form.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs text-secondary-700 hover:text-secondary-900 font-montserrat"
            >
              View on site <ExternalLink size={12} />
            </Link>
          )}
        </div>
      </div>

      <AdminSection title="Post" help="The title and summary are shown on the post card and in Google results.">
        <div className="space-y-4">
          <TextField
            label="Title"
            value={form.title}
            onChange={(v) => {
              set("title", v);
              if (!slugEdited) set("slug", slugify(v));
            }}
          />
          <div>
            <TextField
              label="URL slug"
              value={form.slug}
              onChange={(v) => {
                setSlugEdited(true);
                // Keep a trailing dash while typing; it's trimmed on save
                set("slug", v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+/, ""));
              }}
            />
            <Hint>skyluxeroofing.com/news/{form.slug || "your-post"}</Hint>
          </div>
          <SelectField
            label="Category"
            value={form.category}
            options={POST_CATEGORIES}
            onChange={(v) => set("category", v || "Project Update")}
            placeholder="Choose a category"
          />
          <div>
            <TextField
              label="Summary"
              value={form.excerpt}
              onChange={(v) => set("excerpt", v.slice(0, MAX_EXCERPT))}
              rows={3}
              placeholder="One or two sentences shown on the card and under the title."
            />
            <Hint>
              {form.excerpt.length}/{MAX_EXCERPT}
            </Hint>
          </div>
        </div>
      </AdminSection>

      <AdminSection title="Cover image" help="Shown on cards (4:3) and at the top of the post (16:9). Landscape photos work best.">
        <ImageUpload value={form.coverImageUrl} onChange={(v) => set("coverImageUrl", v)} folder="skyluxe/news" />
        <input
          value={form.coverImageAlt}
          onChange={(e) => set("coverImageAlt", e.target.value)}
          placeholder="Alt text (describe the image for SEO & accessibility)"
          className="mt-2 w-full px-3 py-1.5 border rounded text-sm font-montserrat"
        />
        {form.coverImageUrl && (
          <button
            type="button"
            onClick={() => set("coverImageUrl", "")}
            className="mt-2 text-xs text-red-500 hover:text-red-700 font-montserrat"
          >
            Remove image
          </button>
        )}
      </AdminSection>

      <AdminSection title="Article">
        <RichTextEditor value={form.content} onChange={(json) => set("content", json)} />
      </AdminSection>

      <AdminSection title="Publishing">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Publish date</label>
            <input
              type="date"
              value={form.publishedDate}
              onChange={(e) => set("publishedDate", e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm font-montserrat"
            />
            <Hint>Leave empty to use today&apos;s date when you publish. Newest dates show first.</Hint>
          </div>
          <p className="text-sm font-montserrat text-gray-600">
            Status:{" "}
            <span className={form.published ? "text-green-700 font-medium" : "text-amber-700 font-medium"}>
              {form.published ? "Published" : "Draft (only visible here)"}
            </span>
          </p>
        </div>
      </AdminSection>

      {error && <p className="text-sm text-red-600 font-montserrat bg-red-50 rounded-lg px-3 py-2">{error}</p>}

      <div className="flex flex-wrap justify-end gap-3 sticky bottom-4">
        {form.published ? (
          <button
            onClick={() => save(false)}
            disabled={saving}
            className="px-5 py-2.5 border border-gray-300 bg-white rounded-lg font-montserrat text-sm text-gray-600 shadow-lg disabled:opacity-50"
          >
            Unpublish
          </button>
        ) : (
          <button
            onClick={() => save(false)}
            disabled={saving}
            className="px-5 py-2.5 border border-gray-300 bg-white rounded-lg font-montserrat text-sm text-gray-600 shadow-lg disabled:opacity-50"
          >
            Save draft
          </button>
        )}
        <button
          onClick={() => save(true)}
          disabled={saving}
          className="px-6 py-2.5 bg-gray-800 text-white rounded-lg font-montserrat text-sm font-medium hover:bg-primary-800 disabled:opacity-50 shadow-lg"
        >
          {saving ? "Saving..." : saved ? "Saved!" : form.published ? "Save changes" : "Publish"}
        </button>
      </div>
    </div>
  );
}
