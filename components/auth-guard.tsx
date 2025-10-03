"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
  allowedRoles: string[]
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const userRole = localStorage.getItem("userRole")

    if (!isAuthenticated || !userRole) {
      router.push("/")
      return
    }

    if (!allowedRoles.includes(userRole)) {
      router.push("/")
      return
    }

    setIsAuthorized(true)
  }, [router, allowedRoles])

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return <>{children}</>
}
