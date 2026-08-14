import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Copy, Facebook, Link2, Mail, Share2, Users, XIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { campaign, naira } from "@/lib/portal-store";

export const Route = createFileRoute("/portal/campaign")({
  head: () => ({
    meta: [
      { title: "My campaign — FundEzer" },
      {
        name: "description",
        content:
          "See how much your FundEzer campaign has raised, who has donated and share your campaign link.",
      },
      { property: "og:title", content: "My FundEzer campaign" },
      {
        property: "og:description",
        content: "Funding progress, donations and sharing for your campaign.",
      },
    ],
  }),
  component: CampaignPage,
});

const donations = [
  { id: "g1", name: "Anonymous", amount: 50000, time: "5 hours ago" },
  { id: "g2", name: "Chidi O.", amount: 25000, time: "Yesterday" },
  { id: "g3", name: "Grace A.", amount: 100000, time: "2 days ago" },
  { id: "g4", name: "Anonymous", amount: 15000, time: "3 days ago" },
  { id: "g5", name: "Musa I.", amount: 200000, time: "4 days ago" },
];

function CampaignPage() {
  const percent = Math.round((campaign.raised / campaign.goal) * 100);
  const link = "https://fundezer.app/c/amina-yusuf";

  const share = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Campaign link copied");
    } catch {
      toast.error("Could not copy the link");
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border bg-card p-5 sm:p-7">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-3 py-1 text-xs font-medium text-success">
          Live
        </span>
        <h2 className="mt-3 text-xl font-semibold text-card-foreground">
          {campaign.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{campaign.hospital}</p>

        <p className="mt-5 text-3xl font-semibold text-card-foreground">
          {naira(campaign.raised)}
        </p>
        <p className="text-sm text-muted-foreground">
          raised of {naira(campaign.goal)} goal
        </p>
        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {[
            ["Funded", `${percent}%`],
            ["Donors", `${campaign.donors}`],
            ["Remaining", naira(campaign.goal - campaign.raised)],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl bg-secondary/60 px-4 py-3">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-sm font-semibold text-foreground">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button onClick={share}>
            <Share2 className="size-4" /> Share campaign
          </Button>
          <Button variant="outline" onClick={share}>
            <Copy className="size-4" /> Copy link
          </Button>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
          YOUR STORY
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-card-foreground">
          {campaign.story}
        </p>
        <div className="mt-5 border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">Treatment plan</p>
          <p className="mt-1 text-sm text-foreground">{campaign.treatmentPlan}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <Users className="size-4 text-primary" />
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            RECENT DONATIONS
          </h3>
        </div>
        <ul className="mt-4 divide-y divide-border">
          {donations.map((d) => (
            <li
              key={d.id}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {d.name}
                </p>
                <p className="text-xs text-muted-foreground">{d.time}</p>
              </div>
              <p className="shrink-0 text-sm font-semibold text-primary">
                {naira(d.amount)}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
