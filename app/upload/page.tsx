import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, LogOut } from "lucide-react";
import { logout } from "@/app/login/actions";
import { UploadForms } from "@/components/upload-form";
import { getDictionary, getLanguage, getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDictionary(getLanguage(locale)).upload;

  return {
    title: t.metadataTitle,
    description: t.metadataDescription,
  };
}

export default async function UploadPage() {
  const language = getLanguage(await getLocale());
  const t = getDictionary(language).upload;

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

      <form action={logout} className="absolute top-5 right-5 z-20 sm:top-6 sm:right-8">
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.25em] uppercase text-[#8b8272] transition-colors hover:text-[#c8452f]"
        >
          <LogOut className="size-3.5" />
          {t.signOut}
        </button>
      </form>

      <div className="relative w-full max-w-xl">
        <div className="mb-6 flex items-center justify-between font-mono text-[9px] tracking-[0.3em] uppercase text-[#8b8272]">
          <span>{t.archiveLabel}</span>
          <span>{t.nextMemory}</span>
        </div>

        <h1 className="font-serif text-4xl leading-[0.95] tracking-[-0.03em] sm:text-5xl">
          {t.titleLead}{" "}
          <span className="italic text-[#c8452f]">{t.titleAccent}</span>
        </h1>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-[#6b6356]">
          {t.intro}
        </p>

        <div className="mt-8">
          <UploadForms language={language} copy={t} />
        </div>

        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-[#8b8272] transition-colors hover:text-[#c8452f]"
        >
          {t.backToAlbum}
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </main>
  );
}
