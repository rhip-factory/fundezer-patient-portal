import { createFileRoute } from "@tanstack/react-router";
import { Stethoscope } from "lucide-react";

import { campaign, treatmentUpdates } from "@/lib/portal-store";

export const Route = createFileRoute("/portal/treatment")({
  head: () => ({
    meta: [
      { title: "Treatment record — FundEzer" },
      {
        name: "description",
        content:
          "Read the treatment notes your hospital has shared, including surgery dates and recovery milestones.",
      },
      { property: "og:title", content: "Treatment record" },
      {
        property: "og:description",
        content: "Hospital-verified updates about your treatment.",
      },
    ],
  }),
  component: TreatmentPage,
});

function TreatmentPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h2 className="text-sm font-semibold tracking-wide text-muted-foreground">
          TREATMENT OVERVIEW
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-muted-foreground">Diagnosis</p>
            <p className="mt-1 text-sm text-foreground">{campaign.diagnosis}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Treatment plan</p>
            <p className="mt-1 text-sm text-foreground">
              {campaign.treatmentPlan}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h2 className="text-sm font-semibold tracking-wide text-muted-foreground">
          UPDATES FROM YOUR HOSPITAL
        </h2>
        <ul className="mt-5 space-y-4">
          {treatmentUpdates.map((u) => (
            <li
              key={u.id}
              className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-xl border border-border bg-background p-4"
            >
              <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary-soft">
                <Stethoscope className="size-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground">{u.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {u.date} · {u.hospital}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {u.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs text-muted-foreground">
          Only your verified hospital can add treatment updates.
        </p>
      </section>
    </div>
  );
}
