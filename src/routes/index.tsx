import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2, Lock } from "lucide-react";

import { FundezerLogo } from "@/components/fundezer-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePortal } from "@/lib/portal-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign in to your FundEzer patient portal" },
      {
        name: "description",
        content:
          "Log in to the FundEzer patient portal to track your application, campaign funding and treatment updates.",
      },
      { property: "og:title", content: "Sign in to FundEzer" },
      {
        property: "og:description",
        content:
          "Log in to the FundEzer patient portal to track your application, campaign funding and treatment updates.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});

const DEMO_EMAIL = "amina.yusuf@email.com";
const DEMO_PASSWORD = "fundezer";

function Login() {
  const navigate = useNavigate();
  const { profile } = usePortal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      email.trim().toLowerCase() !== DEMO_EMAIL ||
      password !== DEMO_PASSWORD
    ) {
      setError("Those details don't match our records. Please try again.");
      return;
    }
    setError(null);
    setLoading(true);
    setTimeout(() => navigate({ to: "/portal" }), 500);
  };

  return (
    <div className="grid min-h-screen place-items-center bg-secondary px-4 py-10">
      <main className="w-full max-w-sm">
        <div className="flex flex-col items-center">
          <FundezerLogo className="h-9" />
          <p className="mt-2 text-xs tracking-wide text-muted-foreground">
            Patient Portal
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h1 className="text-xl font-semibold tracking-tight text-card-foreground">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to track your application and treatment.
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
              {loading ? "Signing in…" : "Log in"}
            </Button>
          </form>

          <div className="mt-5 rounded-lg bg-primary-soft px-3 py-2.5 text-xs leading-relaxed text-primary">
            <span className="flex items-center gap-1.5 font-semibold">
              <Lock className="size-3.5" /> Demo credentials
            </span>
            <span className="mt-1 block">
              {DEMO_EMAIL} / {DEMO_PASSWORD}
            </span>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Demonstration prototype for {profile.fullName}. All patient, campaign
          and hospital data shown is fictional.
        </p>
      </main>
    </div>
  );
}
