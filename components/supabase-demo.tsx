"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SupabaseDemo() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    // Check if environment variables are set
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      setError("Supabase environment variables are not set. Please check your .env file.");
      setLoading(false);
      return;
    }

    // Check if the environment variables contain placeholder values
    if (supabaseUrl === "your-supabase-project-url" || supabaseAnonKey === "your-supabase-anon-key") {
      setError("Please replace the placeholder values in your .env file with your actual Supabase credentials.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const supabase = createClient();
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        setError(error.message);
      } else {
        setUser(user);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4">Checking Supabase connection...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        <h3 className="font-bold">Supabase Connection Error</h3>
        <p>{error}</p>
        <p className="mt-2">Please check your environment variables.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-100 text-green-700 rounded">
      <h3 className="font-bold">Supabase Connection Successful!</h3>
      {user ? (
        <div>
          <p>Authenticated User:</p>
          <p>Email: {user.email}</p>
          <p>User ID: {user.id}</p>
        </div>
      ) : (
        <p>No user currently authenticated</p>
      )}
    </div>
  );
}          <p>Authenticated User:</p>
          <p>Email: {user.email}</p>
          <p>User ID: {user.id}</p>
        </div>
      ) : (
        <p>No user currently authenticated</p>
      )}
    </div>
  );
}