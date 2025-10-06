import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase environment variables are not set. Returning a mock client.")
    // Return a mock client for development
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signInWithPassword: async () => ({ data: { user: null }, error: { message: "Supabase not configured" } }),
        signUp: async () => ({ data: { user: null }, error: { message: "Supabase not configured" } }),
        signOut: async () => ({ error: null }),
      },
      from: () => ({
        select: () => ({ data: null, error: { message: "Supabase not configured" } }),
        insert: () => ({ data: null, error: { message: "Supabase not configured" } }),
        update: () => ({ data: null, error: { message: "Supabase not configured" } }),
        delete: () => ({ data: null, error: { message: "Supabase not configured" } }),
      }),
    } as any
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}