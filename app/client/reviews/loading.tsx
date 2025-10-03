import DashboardLayout from "@/components/dashboard-layout"

export default function Loading() {
  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
        <div className="h-96 bg-gray-200 rounded animate-pulse" />
        <div className="h-64 bg-gray-200 rounded animate-pulse" />
      </div>
    </DashboardLayout>
  )
}
