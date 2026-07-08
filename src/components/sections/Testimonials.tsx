import Image from "next/image";
import { getTestimonials } from "@/lib/data";
import { FaStar } from "react-icons/fa";

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1 mb-4" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <FaStar key={i} size={12} className="text-amber-400" />
      ))}
    </div>
  );
}

export default async function Testimonials() {
  const testimonials = await getTestimonials();

  if (!testimonials.length) return null;

  const doubled = [...testimonials, ...testimonials];

  return (
    <section
      className="w-full py-20 sm:py-28 bg-primary-950 overflow-hidden relative"
      aria-labelledby="testimonials-heading"
    >
      {/* ── Abstract angular quote geometry ── */}
      {/* Two large geometric bracket shapes — not literal quotation marks but angular    */}
      {/* forms that suggest enclosure and voice. Clean, architectural, non-decorative.  */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06]"
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Left bracket — opening mark */}
          {/* Vertical stem */}
          <line x1="80" y1="100" x2="80" y2="500" stroke="white" strokeWidth="2" />
          {/* Top arm */}
          <line x1="80" y1="100" x2="160" y2="100" stroke="white" strokeWidth="2" />
          {/* Bottom arm */}
          <line x1="80" y1="500" x2="160" y2="500" stroke="white" strokeWidth="2" />
          {/* Inner shadow lines */}
          <line x1="88" y1="116" x2="88" y2="484" stroke="white" strokeWidth="0.75" opacity="0.5" />
          <line x1="88" y1="116" x2="148" y2="116" stroke="white" strokeWidth="0.75" opacity="0.5" />
          <line x1="88" y1="484" x2="148" y2="484" stroke="white" strokeWidth="0.75" opacity="0.5" />

          {/* Right bracket — closing mark */}
          <line x1="1120" y1="100" x2="1120" y2="500" stroke="white" strokeWidth="2" />
          <line x1="1120" y1="100" x2="1040" y2="100" stroke="white" strokeWidth="2" />
          <line x1="1120" y1="500" x2="1040" y2="500" stroke="white" strokeWidth="2" />
          <line x1="1112" y1="116" x2="1112" y2="484" stroke="white" strokeWidth="0.75" opacity="0.5" />
          <line x1="1112" y1="116" x2="1052" y2="116" stroke="white" strokeWidth="0.75" opacity="0.5" />
          <line x1="1112" y1="484" x2="1052" y2="484" stroke="white" strokeWidth="0.75" opacity="0.5" />

          {/* Center axis line */}
          <line x1="80" y1="300" x2="1120" y2="300" stroke="white" strokeWidth="0.5" strokeDasharray="8 8" opacity="0.3" />

          {/* Small angular accent marks — mid-section */}
          <polyline points="560,260 580,240 600,260" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
          <polyline points="600,340 620,360 640,340" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />

          {/* Vertical rhythm marks — like paragraph markers */}
          {[200, 400, 600, 800, 1000].map((x) => (
            <g key={`vmark-${x}`}>
              <line x1={x} y1="280" x2={x} y2="320" stroke="white" strokeWidth="0.5" opacity="0.2" />
            </g>
          ))}
        </svg>
      </div>

      {/* Section header */}
      <div className="container max-w-7xl mx-auto px-6 lg:px-10 mb-12 relative">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-secondary-600" />
              <span className="font-montserrat text-secondary-400 text-xs uppercase tracking-[0.18em]">
                Client Reviews
              </span>
            </div>
            <h2
              id="testimonials-heading"
              className="font-julius text-white leading-tight"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              From Our Clients.
            </h2>
          </div>

          <div className="flex items-center gap-3 mt-6 sm:mt-0">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <FaStar key={i} size={14} className="text-amber-400" />
              ))}
            </div>
            <div>
              <div className="font-julius text-white text-lg">5.0</div>
              <div className="font-montserrat text-white/40 text-xs">
                {testimonials.length} reviews on Google
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee track */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-primary-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-primary-950 to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 testimonials-marquee">
          {doubled.map((t, i) => (
            <article
              key={`${t.id}-${i}`}
              className="shrink-0 w-80 bg-primary-900 border border-white/5 p-6"
              aria-label={`Review from ${t.name}`}
            >
              <StarRating />

              <blockquote className="font-montserrat text-white/80 text-sm leading-relaxed mb-6 line-clamp-4">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                {t.imgUrl ? (
                  <Image
                    src={t.imgUrl}
                    alt={t.name}
                    width={36}
                    height={36}
                    className="rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-secondary-800 flex items-center justify-center text-white font-montserrat text-xs font-semibold shrink-0">
                    {t.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="font-montserrat text-white text-sm font-medium leading-tight">
                    {t.name}
                  </div>
                  <div className="font-montserrat text-white/40 text-xs mt-0.5">
                    Verified Google Review
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-marquee {
          animation: testimonials-scroll 40s linear infinite;
          width: max-content;
        }
        .testimonials-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes testimonials-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .testimonials-marquee {
            animation: none;
            flex-wrap: wrap;
            width: 100%;
            padding: 0 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
