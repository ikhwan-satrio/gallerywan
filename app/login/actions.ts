"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  isAuthConfigured,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  signSession,
  verifyPassword,
} from "@/lib/auth";
import { getDictionary, getLanguage, getLocale } from "@/lib/i18n";

export type LoginState = { error?: string };

function getSafeNext(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return "/upload";
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return "/upload";
  }
  return value;
}

export async function login(
  _state: LoginState,
  formData: FormData
): Promise<LoginState> {
  const locale = await getLocale();
  const dict = getDictionary(getLanguage(locale)).login;

  if (!isAuthConfigured()) {
    return { error: dict.errorConfig };
  }

  const password = String(formData.get("password") ?? "");
  const next = getSafeNext(formData.get("next"));

  if (!verifyPassword(password)) {
    // Slow down brute-force attempts a little.
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { error: dict.errorPassword };
  }

  const token = await signSession(Date.now() + SESSION_MAX_AGE * 1000);
  if (!token) {
    return { error: dict.errorSession };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect(next);
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/login");
}
