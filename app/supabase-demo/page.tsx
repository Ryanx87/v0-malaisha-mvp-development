import SupabaseDemo from "@/components/supabase-demo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SupabaseDemoPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Supabase Connection Demo</h1>
      
      <div className="mb-6">
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
      
      <div className="max-w-2xl">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Connection Status</h2>
          <SupabaseDemo />
        </div>
        
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Setup Instructions</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Create a Supabase project at <a href="https://supabase.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">supabase.com</a></li>
            <li>Copy your project's URL and anon key from the Supabase dashboard</li>
            <li>Create a <code className="bg-gray-200 px-1 rounded">.env</code> file in the root of the project (copy from <code className="bg-gray-200 px-1 rounded">.env.example</code>)</li>
            <li>Add your Supabase credentials to the <code className="bg-gray-200 px-1 rounded">.env</code> file</li>
            <li>Restart your development server</li>
          </ol>
        </div>
        
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Testing the Connection</h2>
          <p className="mb-4">You can also test the connection by visiting the API endpoint:</p>
          <code className="bg-gray-800 text-white p-3 rounded block">
            /api/test-supabase
          </code>
        </div>
      </div>
    </div>
  );
}