import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2, Lock } from "lucide-react";

import { FundezerLogo } from "@/components/fundezer-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type AuthMode = "login" | "signup";

function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const changeMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setError(null);
    setNotice(null);
  };

  const ensureProfile = async (
    user: { id: string; email?: string; user_metadata: Record<string, unknown> },
    preferredName?: string,
  ) => {
    const existing = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();
    if (existing.error) throw existing.error;
    if (existing.data) return;

    const metadataName =
      typeof user.user_metadata["full_name"] === "string"
        ? user.user_metadata["full_name"]
        : "";
    const resolvedName =
      preferredName?.trim() ||
      metadataName.trim() ||
      user.email?.split("@")[0] ||
      "FundEzer patient";
    const created = await supabase.from("profiles").insert({
      user_id: user.id,
      full_name: resolvedName,
      email: user.email ?? null,
    });
    if (created.error) throw created.error;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const address = email.trim();
    if (!EMAIL_PATTERN.test(address)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }
    if (mode === "signup" && !fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (mode === "signup" && password.length < 6) {
      setError("Your password must be at least 6 characters.");
      return;
    }
    if (mode === "signup" && password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }
    setError(null);
    setNotice(null);
    setLoading(true);

    try {
      if (mode === "login") {
        const signIn = await supabase.auth.signInWithPassword({
          email: address,
          password,
        });
        if (signIn.error) {
          setError(
            /invalid login credentials/i.test(signIn.error.message)
              ? "The email or password is incorrect."
              : signIn.error.message,
          );
          return;
        }
        await ensureProfile(signIn.data.user);
        navigate({ to: "/portal" });
        return;
      }

      const signUp = await supabase.auth.signUp({
        email: address,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: { full_name: fullName.trim() },
        },
      });
      if (signUp.error) {
        setError(signUp.error.message);
        return;
      }
      if (signUp.data.user?.identities?.length === 0) {
        setError("An account already exists for this email. Log in instead.");
        return;
      }
      if (signUp.data.session && signUp.data.user) {
        await ensureProfile(signUp.data.user, fullName);
        navigate({ to: "/portal" });
        return;
      }
      setNotice("Check your email to confirm your account, then return here to log in.");
    } catch {
      setError("We could not reach FundEzer right now. Please try again.");
    } finally {
      setLoading(false);
    }
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
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "login"
              ? "Sign in to track your application and treatment."
              : "Register to apply for support and follow your care journey."}
          </p>

          <div className="mt-5 grid grid-cols-2 rounded-lg bg-secondary p-1" aria-label="Account access">
            <Button
              type="button"
              size="sm"
              variant={mode === "login" ? "default" : "ghost"}
              onClick={() => changeMode("login")}
            >
              Log in
            </Button>
            <Button
              type="button"
              size="sm"
              variant={mode === "signup" ? "default" : "ghost"}
              onClick={() => changeMode("signup")}
            >
              Create account
            </Button>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "signup" && (
              <div className="space-y-1.5">
                <Label htmlFor="full-name">Full name</Label>
                <Input
                  id="full-name"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            )}
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
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {mode === "signup" && (
              <div className="space-y-1.5">
                <Label htmlFor="confirm-password">Confirm password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}

            {notice && (
              <p role="status" className="text-sm text-primary">
                {notice}
              </p>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
              {loading
                ? mode === "login"
                  ? "Signing in…"
                  : "Creating account…"
                : mode === "login"
                  ? "Log in"
                  : "Create account"}
            </Button>
          </form>

          <div className="mt-5 rounded-lg bg-primary-soft px-3 py-2.5 text-xs leading-relaxed text-primary">
            <span className="flex items-center gap-1.5 font-semibold">
              <Lock className="size-3.5" /> Secure sign in
            </span>
            <span className="mt-1 block">
               Your account details and medical application are protected and only
               available to you and authorised FundEzer care teams.
            </span>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          © FundEzer. Secure patient access.
        </p>
      </main>
    </div>
  );
}
