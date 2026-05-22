"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type LearningAccessCtaProps = {
  authenticatedHref: string;
  authenticatedLabel: string;
  guestHref?: string;
  guestLabel: string;
  className?: string;
};

export function LearningAccessCta({
  authenticatedHref,
  authenticatedLabel,
  guestHref = "/auth/signup",
  guestLabel,
  className,
}: LearningAccessCtaProps) {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let active = true;

    if (!supabase) {
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (active) {
        setIsAuthenticated(Boolean(data.session));
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session));
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <Link href={isAuthenticated ? authenticatedHref : guestHref} className={className}>
      {isAuthenticated ? authenticatedLabel : guestLabel}
    </Link>
  );
}