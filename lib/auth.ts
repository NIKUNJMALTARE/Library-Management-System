"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function useAuth() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    }
  }, [router])

  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    router.push("/login")
  }

  const getUser = () => {
    const userStr = localStorage.getItem("user")
    if (!userStr) return null
    try {
      return JSON.parse(userStr)
    } catch (e) {
      return null
    }
  }

  const getToken = () => {
    return localStorage.getItem("token")
  }

  return { logout, getUser, getToken }
}

