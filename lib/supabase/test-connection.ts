import { createClient } from "./client";

/**
 * Test Supabase connection
 * This function can be used to verify that the Supabase connection is working properly
 */
export async function testSupabaseConnection() {
  // Check if environment variables are set
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return { 
      success: false, 
      error: "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set in your .env file" 
    };
  }

  // Check if the environment variables contain placeholder values
  if (supabaseUrl === "your-supabase-project-url" || supabaseAnonKey === "your-supabase-anon-key") {
    return { 
      success: false, 
      error: "Please replace the placeholder values in your .env file with your actual Supabase credentials" 
    };
  }

  // Validate that the URL is properly formatted
  try {
    new URL(supabaseUrl);
  } catch {
    return { 
      success: false, 
      error: "Invalid Supabase URL. Please ensure it's a valid HTTP or HTTPS URL" 
    };
  }

  try {
    const supabase = createClient();
    
    // Test the connection by trying to fetch the current user (will be null if not logged in)
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error("Supabase connection error:", error.message);
      return { success: false, error: error.message };
    }
    
    console.log("Supabase connection successful!");
    console.log("User:", user);
    
    return { success: true, user };
  } catch (error: any) {
    console.error("Supabase connection failed:", error.message);
    return { success: false, error: error.message };
  }
}