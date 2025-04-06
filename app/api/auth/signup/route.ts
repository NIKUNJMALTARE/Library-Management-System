import { NextResponse } from "next/server"

// This is a mock implementation - replace with your actual backend integration
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real implementation, you would:
    // 1. Check if user already exists
    // 2. Hash the password
    // 3. Store user in database
    // 4. Generate JWT token

    // Mock implementation for demo purposes
    const user = {
      id: `user-${Date.now()}`,
      name,
      email,
      createdAt: new Date().toISOString(),
    }

    const token = `mock-jwt-token-${Date.now()}`

    return NextResponse.json({ user, token }, { status: 201 })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

