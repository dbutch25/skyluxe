"use client";

/** News posts list. Editing happens at /admin/news/[id] ("new" creates one). */

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import type { PostSummary } from "@/types";
import { formatPostDate } from "@/components/news/format";

export default function NewsAdminPage() {
  const [posts, setPosts] = useState<PostSummary[] | null>(null);

  useEffect(() => {
    fetch("/api/cms/posts")
      .then((r) => (r.ok ? r.json() : []))
      .then(setPosts);
  }, []);

  const del = async (post: PostSummary) => {
    if (!confirm(`Delete "${post.title}"? This can't be undone.`)) return;
    const res = await fetch(`/api/cms/posts/${post.id}`, { method: "DELETE" });
    if (res.ok) setPosts((p) => (p ?? []).filter((x) => x.id !== post.id));
  };

  return (
    <div className="max-w-5xl">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-julius text-primary-950">News</h1>
          <p className="text-sm text-gray-500 font-montserrat mt-1">
            Posts appear on the News page. The latest 3 published posts also show on the homepage.
          </p>
        </div>
        <Link
          href="/admin/news/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 text-white rounded-lg font-montserrat text-sm hover:bg-primary-800 transition-colors shrink-0"
        >
          <Plus size={16} /> New Post
        </Link>
      </div>

      {posts === null && <p className="text-sm text-gray-400 font-montserrat">Loading…</p>}

      {posts?.length === 0 && (
        <p className="text-sm text-gray-400 font-montserrat bg-white rounded-xl border border-dashed border-gray-200 p-8 text-center">
          No posts yet. Until you publish one, the homepage only shows the charity spotlight.
        </p>
      )}

      <div className="space-y-3">
        {posts?.map((p) => (
          <div key={p.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
            <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
              {p.coverImageUrl ? (
                <Image src={p.coverImageUrl} alt="" fill className="object-cover" sizes="96px" />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-[10px] text-gray-400 font-montserrat">
                  No image
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <Link href={`/admin/news/${p.id}`} className="font-julius text-primary-950 text-sm hover:underline">
                {p.title}
              </Link>
              <p className="text-xs text-gray-400 font-montserrat truncate">{p.excerpt}</p>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span
                  className={`text-xs rounded-full px-2 py-0.5 font-montserrat ${
                    p.published ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {p.published ? "Published" : "Draft"}
                </span>
                <span className="text-xs bg-secondary-50 text-secondary-700 rounded-full px-2 py-0.5 font-montserrat">
                  {p.category}
                </span>
                {p.publishedAt && (
                  <span className="text-xs text-gray-400 font-montserrat">{formatPostDate(p.publishedAt)}</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {p.published && (
                <Link
                  href={`/news/${p.slug}`}
                  target="_blank"
                  className="p-2 text-gray-400 hover:text-primary-950 transition-colors"
                  aria-label={`View ${p.title} on the site`}
                >
                  <ExternalLink size={16} />
                </Link>
              )}
              <Link
                href={`/admin/news/${p.id}`}
                className="p-2 text-gray-400 hover:text-primary-950 transition-colors"
                aria-label={`Edit ${p.title}`}
              >
                <Pencil size={16} />
              </Link>
              <button
                onClick={() => del(p)}
                className="p-2 text-red-400 hover:text-red-600 transition-colors"
                aria-label={`Delete ${p.title}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
