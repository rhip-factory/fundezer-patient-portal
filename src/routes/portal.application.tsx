import { createFileRoute } from "@tanstack/react-router";
import { Check, Circle } from "lucide-react";

import { application, campaign, usePortal } from "@/lib/portal-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/application")({
  head: () => ({
    meta: [
      { title: "Application status — FundEzer" },
      {
        name: "description",
        content:
          "Follow each stage of your FundEzer application, from submission through hospital verification to a live campaign.",
      },
      { property: "og:title", content: "Application status" },
      {
        property: "og:description",
        content: "Every stage of your application in one timeline.",
      },
    ],
  }),
  component: ApplicationPage,
});

const stages = [
  {
    title: "Application submitted",
    date: "04 August 2026",
    body: "Your application and documents were received by FundEzer.",
    done: true,
  },
  {
    title: "Hospital verification",
    date: "06 August 2026",
    body: "Cedarcrest Hospital confirmed your diagnosis and treatment plan.",
    done: true,
  },
  {
    title: "Application approved",
    date: "08 August 2026",
    body: "Your application was approved and prepared for publishing.",
    done: true,
  },
  {
    title: "Campaign live",
    date: "09 August 2026",
    body: "Your campaign is published and accepting donations.",
    done: true,
  },
  {
    title: "Funding complete",
    date: "Pending",
    body: "Your campaign reaches its goal and funds are released to the hospital.",
    done: false,
  },
];

function ApplicationPage() {
  const { profile } = usePortal();

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h2 className="text-sm font-semibold tracking-wide text-muted-foreground">
          APPLICATION SUMMARY
        </h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            ["Application ID", application.id],
            ["Submitted", application.submitted],
            ["Hospital", `${application.hospital}, Abuja`],
            ["Patient", profile.fullName],
            ["Current status", "Campaign live"],
            ["Treatment", campaign.diagnosis],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="mt-0.5 text-sm font-medium text-foreground">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h2 className="text-sm font-semibold tracking-wide text-muted-foreground">
          PROGRESS
        </h2>
        <ol className="mt-5 space-y-0">
          {stages.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full",
                    s.done ? "bg-primary" : "border border-border bg-secondary",
                  )}
                >
                  {s.done ? (
                    <Check className="size-4 text-primary-foreground" />
                  ) : (
                    <Circle className="size-3 text-muted-foreground" />
                  )}
                </span>
                {i < stages.length - 1 && (
                  <span
                    className={cn(
                      "my-1 w-px flex-1",
                      s.done ? "bg-primary/40" : "bg-border",
                    )}
                  />
                )}
              </div>
              <div className={cn("min-w-0", i < stages.length - 1 && "pb-6")}>
                <p
                  className={cn(
                    "font-semibold",
                    s.done ? "text-card-foreground" : "text-muted-foreground",
                  )}
                >
                  {s.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.date}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
