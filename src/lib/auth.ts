import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_SECRET = process.env.SESSION_SECRET || "default-secret-change-me";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateSessionToken(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2);
  return `${timestamp}-${random}-${SESSION_SECRET}`;
}

export async function createSession(): Promise<string> {
  const token = generateSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
  return token;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function verifySession(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);
  return !!session?.value;
}

export async function authenticateAdmin(password: string): Promise<boolean> {
  const admin = await prisma.admin.findFirst();
  
  if (!admin) {
    // Create default admin if none exists
    const hashedPassword = await hashPassword("admin123");
    await prisma.admin.create({
      data: { password: hashedPassword },
    });
    return password === "admin123";
  }
  
  return verifyPassword(password, admin.password);
}

export async function changeAdminPassword(newPassword: string): Promise<void> {
  const hashedPassword = await hashPassword(newPassword);
  const admin = await prisma.admin.findFirst();
  
  if (admin) {
    await prisma.admin.update({
      where: { id: admin.id },
      data: { password: hashedPassword },
    });
  } else {
    await prisma.admin.create({
      data: { password: hashedPassword },
    });
  }
}
