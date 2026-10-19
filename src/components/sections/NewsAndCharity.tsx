/**
 * Homepage "Latest News & Updates" section:
 * charity spotlight (CMS: /admin/charity) + latest 3 posts (CMS: /admin/news).
 * Each half hides itself when it has no content; the whole section hides when both do.
 */
import Image from "next/image";
import Link from "next/link";
import type { CharitySpotlight, PostSummary } from "@/types";
import PostCard, { ArrowIcon } from "@/components/news/PostCard";

interface Props {
  charity: CharitySpotlight | null;
  posts: PostSummary[];
}

/** Internal paths use next/link; full URLs open in a new tab. */
function SmartLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-px w-8 ${light ? "bg-secondary-400" : "bg-secondary-600"}`} />
      <span
        className={`font-montserrat text-xs uppercase tracking-[0.18em] ${
          light ? "text-secondary-300" : "text-secondary-700"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

function CharityCard({ charity }: { charity: CharitySpotlight }) {
  const stats = [
    { label: "Next Event", value: charity.nextEvent },
    { label: "Raised to Date", value: charity.raisedToDate },
    { label: "Golf Club", value: charity.venue },
  ].filter((s): s is { label: string; value: string } => !!s.value);

  return (
    <article
      aria-labelledby="charity-heading"
      className="flex flex-col lg:flex-row overflow-hidden rounded-2xl bg-primary-900"
    >
      {/* Photo */}
      <div className="relative min-h-72 sm:min-h-96 lg:min-h-115 lg:flex-1 bg-primary-800">
        {charity.imageUrl ? (
          <Image
            src={charity.imageUrl}
            alt={charity.imageAlt || charity.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full opacity-[0.12]"
            viewBox="0 0 600 460"
            preserveAspectRatio="xMidYMid slice"
          >
            <g stroke="#aed4e9" strokeWidth="0.75">
              <line x1="0" y1="40" x2="40" y2="0" />
              <line x1="0" y1="80" x2="80" y2="0" />
              <line x1="0" y1="120" x2="120" y2="0" />
              <line x1="0" y1="160" x2="160" y2="0" />
              <line x1="600" y1="300" x2="440" y2="460" />
              <line x1="600" y1="340" x2="480" y2="460" />
              <line x1="600" y1="380" x2="520" y2="460" />
              <line x1="600" y1="420" x2="560" y2="460" />
            </g>
          </svg>
        )}
        <span className="absolute left-6 top-6 rounded bg-secondary-800 px-3 py-2 font-montserrat text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
          Community Spotlight
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-6 p-7 sm:p-10 lg:p-14 lg:flex-1">
        {charity.label && <Eyebrow light>{charity.label}</Eyebrow>}

        <h3
          id="charity-heading"
          className="m-0 font-julius font-normal leading-tight text-white"
          style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.125rem)" }}
        >
          {charity.title}
        </h3>

        <p className="m-0 whitespace-pre-line font-montserrat text-[15px] leading-7 text-white/80">
          {charity.body}
        </p>

        {stats.length > 0 && (
          <dl
            className="m-0 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10"
            style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1.5 bg-primary-900 px-4 py-4.5">
                <dt className="font-montserrat text-[11px] uppercase tracking-[0.14em] text-white/60">
                  {s.label}
                </dt>
                <dd className="m-0 font-julius text-base sm:text-lg text-white">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {(charity.causeTitle || charity.causeBody) && (
          <div className="flex items-start gap-4 rounded-lg border border-secondary-300/25 bg-secondary-800/35 p-5">
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#aed4e9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-none">
              <path d="M3 11l9-7 9 7" />
              <path d="M5 10v10h14V10" />
              <path d="M12 18s-3-1.8-3-3.6a1.6 1.6 0 0 1 3-.8 1.6 1.6 0 0 1 3 .8C15 16.2 12 18 12 18z" />
            </svg>
            <div className="flex flex-col gap-1">
              {charity.causeTitle && (
                <span className="font-montserrat text-sm font-semibold text-white">{charity.causeTitle}</span>
              )}
              {charity.causeBody && (
                <span className="font-montserrat text-[13px] leading-relaxed text-white/75">{charity.causeBody}</span>
              )}
            </div>
          </div>
        )}

        {(charity.recapLink || charity.donateLink) && (
          <div className="mt-2 flex flex-wrap gap-3">
            {charity.recapLink && (
              <SmartLink
                href={charity.recapLink}
                className="inline-flex min-h-12 items-center gap-2.5 rounded-md bg-white px-5.5 font-montserrat text-sm font-semibold text-primary-950 hover:bg-secondary-50 transition-colors"
              >
                Tournament Recap
                <ArrowIcon size={14} />
              </SmartLink>
            )}
            {charity.donateLink && (
              <SmartLink
                href={charity.donateLink}
                className="inline-flex min-h-12 items-center rounded-md border border-white/35 px-5.5 font-montserrat text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Support the Cause
              </SmartLink>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function NewsAndCharity({ charity, posts }: Props) {
  const showCharity = !!charity?.enabled;
  if (!showCharity && posts.length === 0) return null;

  return (
    <section
      aria-labelledby="news-heading"
      className="w-full border-t border-primary-50 bg-white py-16 sm:py-20 lg:py-28"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:gap-14 px-6 sm:px-10">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
          <div className="flex flex-col gap-4">
            <Eyebrow>Latest News &amp; Updates</Eyebrow>
            <h2
              id="news-heading"
              className="m-0 font-julius font-normal leading-tight text-primary-950"
              style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.75rem)" }}
            >
              On the Job &amp; In the Community
            </h2>
          </div>
          {posts.length > 0 && (
            <Link
              href="/news"
              className="group inline-flex min-h-11 items-center gap-2.5 font-montserrat text-sm font-semibold text-secondary-800 hover:text-secondary-900"
            >
              View All News
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon size={14} />
              </span>
            </Link>
          )}
        </div>

        {showCharity && charity && <CharityCard charity={charity} />}

        {/* Recent posts */}
        {posts.length > 0 && (
          <div className="flex flex-col gap-7">
            <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-4">
              <h3 className="m-0 font-montserrat text-[13px] font-semibold uppercase tracking-[0.16em] text-primary-700">
                Recent Posts
              </h3>
            </div>
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
