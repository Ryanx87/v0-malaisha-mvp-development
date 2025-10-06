import { testSupabaseConnection } from "@/lib/supabase/test-connection";
import { NextResponse } from "next/server";

/**
 * Test Supabase connection endpoint
 * This API route can be used to verify that the Supabase connection is working properly
 */
export async function GET() {
  // Check if environment variables are set
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({
      success: false,
      message: "Supabase environment variables are not set",
      error: "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set in your .env file"
    }, { status: 500 });
  }

  // Check if the environment variables contain placeholder values
  if (supabaseUrl === "your-supabase-project-url" || supabaseAnonKey === "your-supabase-anon-key") {
    return NextResponse.json({
      success: false,
      message: "Placeholder values detected",
      error: "Please replace the placeholder values in your .env file with your actual Supabase credentials"
    }, { status: 500 });
  }

  try {
    const result = await testSupabaseConnection();
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Supabase connection successful!",
        user: result.user
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Supabase connection failed!",
        error: result.error
      }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: "An error occurred while testing Supabase connection",
      error: error.message
    }, { status: 500 });
  }
}