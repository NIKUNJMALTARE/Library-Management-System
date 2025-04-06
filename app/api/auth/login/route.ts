import { NextResponse } from "next/server"

// This is a mock implementation - replace with your actual backend integration
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // In a real implementation, you would:
    // 1. Find user by email
    // 2. Verify password hash
    // 3. Generate JWT token

    // Mock implementation for demo purposes
    // For demo, we'll accept any credentials
    const user = {
      id: `user-${Date.now()}`,
      name: "Demo User",
      email,
      createdAt: new Date().toISOString(),
    }

    const token = `mock-jwt-token-${Date.now()}`

    return NextResponse.json({ user, token })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

