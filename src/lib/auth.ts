import { prisma } from './db'
import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-key-change-in-production'
)

const SALT_ROUNDS = 12

// Password utilities
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// JWT utilities
export async function createToken(payload: { userId: string; email: string; role: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as { userId: string; email: string; role: string }
  } catch {
    return null
  }
}

// Session management
export async function createSession(userId: string, request?: NextRequest) {
  const sessionToken = crypto.randomUUID()
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  await prisma.session.create({
    data: {
      sessionToken,
      userId,
      expires,
      ipAddress: request?.headers.get('x-forwarded-for') || request?.headers.get('x-real-ip') || null,
      userAgent: request?.headers.get('user-agent') || null,
    },
  })

  return { sessionToken, expires }
}

export async function getSession(sessionToken: string) {
  const session = await prisma.session.findUnique({
    where: { sessionToken },
    include: { user: true },
  })

  if (!session || session.expires < new Date()) {
    if (session) {
      await prisma.session.delete({ where: { id: session.id } })
    }
    return null
  }

  return session
}

export async function deleteSession(sessionToken: string) {
  try {
    await prisma.session.delete({ where: { sessionToken } })
  } catch {
    // Session might not exist
  }
}

// Get current user from cookies
export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) return null

  const payload = await verifyToken(token)
  if (!payload) return null

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      image: true,
      phone: true,
      emailVerified: true,
      createdAt: true,
    },
  })

  return user
}

// Register new user
export async function registerUser(data: {
  email: string
  password: string
  name: string
  phone?: string
}) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  })

  if (existingUser) {
    throw new Error('User with this email already exists')
  }

  const hashedPassword = await hashPassword(data.password)

  const user = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      phone: data.phone,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
    },
  })

  return user
}

// Login user
export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { password: true },
  })

  if (!user || !user.password) {
    throw new Error('Invalid email or password')
  }

  if (user.status === 'SUSPENDED') {
    throw new Error('Your account has been suspended')
  }

  const isValid = await verifyPassword(password, user.password.hash)

  if (!isValid) {
    throw new Error('Invalid email or password')
  }

  // Create JWT token
  const token = await createToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  })

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      status: user.status,
    },
    token,
  }
}

// Logout user
export async function logoutUser() {
  const cookieStore = await cookies()
  cookieStore.delete('auth-token')
}
