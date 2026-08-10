import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Lock, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { FundezerLogo } from "@/components/fundezer-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePortal } from "@/lib/portal-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Patient login — FundEzer" },
      {
        name: "description",
        content:
          "Sign in to your FundEzer patient portal to track your application, campaign funding and treatment updates.",
      },
      { property: "og:title", content: "Patient login — FundEzer" },
      {
        property: "og:description",
        content:
          "Sign in to track your FundEzer application, campaign funding and treatment updates.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { profile } = usePortal();
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Enter your email and password to continue.");
      return;
    }
    setError(null);
    void navigate({ to: "/portal" });
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-secondary/40 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center">
          <FundezerLogo className="h-12 w-auto" />
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h1 className="text-xl font-semibold text-card-foreground">
            Sign in to your patient portal
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Track your application, campaign funding and treatment updates.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {error ? (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}

            <Button type="submit" className="w-full">
              <Lock className="size-4" /> Sign in
            </Button>
          </form>

          <p className="mt-5 flex items-start gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-primary" />
            Your medical information is only shared with your verified partner
            hospital.
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Demonstration prototype — patient, campaign and hospital data shown is
          fictional.
        </p>
      </div>
    </main>
  );
}
