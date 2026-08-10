import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";

import { FundezerLogo } from "@/components/fundezer-logo";
import { Button } from "@/components/ui/button";
import { usePortal } from "@/lib/portal-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Get help funding your treatment — FundEzer" },
      {
        name: "description",
        content:
          "Apply for treatment sponsorship through FundEzer and connect with verified hospital support in Abuja.",
      },
      { property: "og:title", content: "Get help funding your treatment" },
      {
        property: "og:description",
        content:
          "Apply for treatment sponsorship through FundEzer and connect with verified hospital support in Abuja.",
      },
    ],
  }),
  component: Index,
});

const points = [
  {
    icon: ShieldCheck,
    title: "Verified hospital partners",
    body: "Every application is reviewed by a partner hospital in Abuja before a campaign goes live.",
  },
  {
    icon: Sparkles,
    title: "We help tell your story",
    body: "Answer a few simple questions and FundEzer drafts a clear, respectful story for donors.",
  },
  {
    icon: HeartHandshake,
    title: "Funds go to your hospital",
    body: "Donations are paid directly to your verified hospital, never to individuals.",
  },
];

function Index() {
  const navigate = useNavigate();
  const { resetFlow, prefillSavedApplication } = usePortal();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 sm:px-6">
          <FundezerLogo className="h-7" />
          <Link
            to="/portal"
            className="shrink-0 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Patient portal
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-center">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
              Now available in Abuja
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
              Get help funding your treatment
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Apply for treatment sponsorship through FundEzer and connect with
              verified hospital support.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={() => {
                  resetFlow();
                  navigate({ to: "/apply/location" });
                }}
              >
                Start application
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  prefillSavedApplication();
                  navigate({ to: "/apply/documents" });
                }}
              >
                Continue application
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Continuing picks up a saved application at the documents step.
            </p>
          </div>

          <div className="space-y-4">
            {points.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <p.icon className="size-5 text-primary" />
                <h2 className="mt-3 text-base font-semibold text-card-foreground">
                  {p.title}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-16 text-xs text-muted-foreground">
          This is a demonstration prototype. All patient, campaign and hospital
          data shown is fictional.
        </p>
      </main>
    </div>
  );
}
