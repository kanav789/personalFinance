import { auth } from "@/auth";
import type { Session } from "next-auth";

/**
 * Get the full session object, or null if not signed in.
 */
export async function getServerSession(): Promise<Session | null> {
  return await auth();
}

/**
 * Get the current user's ID from the session.
 * Throws an error if not authenticated.
 */
export async function getUserId(): Promise<string> {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized: No session or user ID found.");
  }

  return session.user.id;
}

/**
 * Get the current user object from the session.
 * Throws an error if not authenticated.
 */
export async function getUser(): Promise<NonNullable<Session["user"]>> {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized: No session user found.");
  }

  return session.user;
}
