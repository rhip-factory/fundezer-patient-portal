import { createMiddleware } from "@tanstack/react-start";

import { supabase } from "@/integrations/supabase/client";

/**
 * Attaches the signed-in patient's access token to every server function call
 * so `requireSupabaseAuth` can act as that user (RLS applies).
 */
export const attachSupabaseAuth = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (token) {
        return await next({
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch {
      // fall through: the server function will reject unauthenticated calls
    }
    return await next();
  },
);
