import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import { isAuthConfigured } from "@/lib/auth";
import { getDictionary, getLanguage, getLocale } from "@/lib/i18n";
import { LoginForm } from "./login-form";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDictionary(getLanguage(locale)).login;

  return {
    title: t.metadataTitle,
    description: t.metadataDescription,
  };
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : "/upload";
  const configured = isAuthConfigured();

  const locale = await getLocale();
  const t = getDictionary(getLanguage(locale)).login;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f2ecdf] px-5 py-16 text-[#221f1a] selection:bg-[#c8452f] selection:text-[#fbf7ee]">
      <div
        aria-hidden
        className="paper-grain pointer-events-none fixed inset-0 z-50 opacity-[0.05] mix-blend-multiply"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-32 -left-40 size-[30rem] rounded-full border border-[#c8452f]/15" />
        <div className="absolute -right-32 -bottom-40 size-[32rem] rounded-full border border-[#8b8272]/15" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[26rem] leading-none text-[#c8452f]/5 select-none">
          ✳
        </div>
      </div>

      <div className="relative w-full max-w-sm">
        <div className="absolute -top-2.5 left-1/2 z-10 h-5 w-24 -translate-x-1/2 -rotate-2 bg-[#e6d5a4]/75 shadow-[0_1px_2px_rgba(0,0,0,0.08)] backdrop-blur-[1px]" />

        <div className="relative border border-[#d5cbb8] bg-[#fbf7ee] px-7 py-10 shadow-[0_22px_45px_-28px_rgba(43,35,22,0.7)] sm:px-9">
          <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.3em] uppercase text-[#9c927f]">
            <span>{t.eyebrow}</span>
            <Heart className="size-3 fill-[#c8452f] text-[#c8452f]" />
          </div>

          <h1 className="mt-6 font-serif text-4xl leading-[0.95] tracking-[-0.03em]">
            {t.welcomeLead}
            <br />
            <span className="italic text-[#c8452f]">{t.welcomeAccent}</span>
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-[#6b6356]">
            {t.description}
          </p>

          <div className="mt-8">
            {configured ? (
              <LoginForm
                next={next}
                copy={{
                  secretWord: t.secretWord,
                  submit: t.submit,
                  submitting: t.submitting,
                }}
              />
            ) : (
              <div className="border border-dashed border-[#c7bcaa] p-4 font-mono text-[11px] leading-relaxed text-[#8b8272]">
                <p className="text-[#c8452f]">{t.configTitle}</p>
                <p className="mt-2">{t.configBody}</p>
              </div>
            )}
          </div>
        </div>

        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-[#8b8272] transition-colors hover:text-[#c8452f]"
        >
          {t.seeAlbum}
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </main>
  );
}
