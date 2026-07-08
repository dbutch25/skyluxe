/**
 * Simple in-memory rate limiter.
 * Works per-process — for multi-instance deployments use Redis instead.
 * Fine for Vercel serverless since each function is isolated per request pool.
 */

interface RateLimitEntry {
  count: number;
  reset: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now > entry.reset) store.delete(key);
  }
}, 5 * 60 * 1000);

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000
): RateLimitResult {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.reset) {
    store.set(key, { count: 1, reset: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: entry.reset };
  }

  entry.count++;
  return { allowed: true, remaining: limit - entry.count, resetAt: entry.reset };
}

/**
 * Get client IP from Next.js request headers.
 */
export function getClientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    headers.get("x-real-ip") ??
    "unknown"
  );
}
