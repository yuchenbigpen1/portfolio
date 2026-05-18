"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";

const POSTHOG_KEY =
  process.env.NEXT_PUBLIC_POSTHOG_KEY ??
  "phc_kEanBjPt4LTDh8GKBWDgUKm3gDzvQD2ZWK9rYyArnZNN";
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

let initialized = false;
function initOnce() {
  if (initialized || typeof window === "undefined") return;
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: false, // we fire pageviews manually below for App Router
    capture_pageleave: true,
    person_profiles: "identified_only",
  });
  initialized = true;
}

function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    initOnce();
    if (!pathname) return;
    let url = window.origin + pathname;
    const q = searchParams?.toString();
    if (q) url += `?${q}`;
    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
      {children}
    </>
  );
}
