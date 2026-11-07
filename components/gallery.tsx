import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import { ImageFrame } from "@/components/image-frame";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import cloudinary from "@/lib/cloudinary";
import {
  formatDate,
  formatNumber,
  formatShortDate,
  getDictionary,
  getLanguage,
  getLocale,
} from "@/lib/i18n";
import { CloudinaryReturn } from "@/lib/types/cloudinary.types";
import { cn } from "@/lib/utils";

const tilts = [
  "-rotate-[1.6deg]",
  "rotate-[1.1deg]",
  "-rotate-[0.7deg]",
  "rotate-[1.8deg]",
  "-rotate-[1.2deg]",
];

const tapeTilts = [
  "-rotate-[3deg]",
  "rotate-[2deg]",
  "-rotate-[1.5deg]",
  "rotate-[3deg]",
  "-rotate-[2.5deg]",
];

function formatName(name: string, untitled: string) {
  return name.replace(/[_-]+/g, " ").trim() || untitled;
}

export async function Gallery() {
  const locale = await getLocale();
  const dict = getDictionary(getLanguage(locale));
  const t = dict.gallery;

  const result: CloudinaryReturn = await cloudinary.api.resources({
    type: "upload",
    prefix: "memories",
    max_results: 30,
    sort_by: { created_at: "desc" },
  });

  const timestamps = result.resources
    .map((img) => new Date(img.created_at).getTime())
    .filter((time) => !Number.isNaN(time));
  const earliest = timestamps.length ? new Date(Math.min(...timestamps)) : null;
  const latest = timestamps.length ? new Date(Math.max(...timestamps)) : null;
  const count = result.resources.length;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f2ecdf] text-[#221f1a] selection:bg-[#c8452f] selection:text-[#fbf7ee]">
      <div
        aria-hidden
        className="paper-grain pointer-events-none fixed inset-0 z-50 opacity-[0.05] mix-blend-multiply"
      />

      <span className="absolute top-1/2 left-3 hidden -translate-y-1/2 -rotate-90 font-mono text-[9px] tracking-[0.5em] whitespace-nowrap uppercase text-[#8b8272]/70 xl:block">
        {t.storyInFrames(String(earliest?.getFullYear() ?? "—"))}
      </span>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-24 -right-40 size-[34rem] rounded-full border border-[#c8452f]/15" />
        <div className="absolute -top-8 -right-24 size-[22rem] rounded-full border border-[#c8452f]/10" />
        <div className="absolute top-[38rem] -left-24 size-[28rem] rounded-full border border-[#8b8272]/15" />
        <div className="absolute right-[12%] top-[24rem] font-serif text-[10rem] leading-none text-[#c8452f]/5 select-none">
          ✳
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-5 pt-6 pb-16 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between border-b border-[#d5cbb8] pb-4 font-mono text-[10px] tracking-[0.3em] uppercase text-[#8b8272]">
          <span className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#c8452f]" />
            {t.archiveLabel}
          </span>
          <span>MMXXVI</span>
        </div>

        <header className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#8b8272]">
              {t.volume}
            </p>

            <h1 className="mt-5 font-serif text-[clamp(3.4rem,9vw,7.5rem)] leading-[0.86] tracking-[-0.045em]">
              {t.titleLead}{" "}
              <span className="italic text-[#c8452f]">{t.titleAccent}</span>
            </h1>

            <svg
              aria-hidden
              viewBox="0 0 320 16"
              fill="none"
              className="mt-4 h-3 w-56 text-[#c8452f]/70 sm:w-64"
            >
              <path
                d="M2 11c44-7 91-9 142-5 38 3 88 4 174-4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>

            <p className="mt-7 max-w-md text-pretty text-sm leading-relaxed text-[#6b6356] sm:text-base">
              {t.intro}
            </p>
          </div>

          <div className="lg:col-span-4 lg:pb-2">
            <dl className="divide-y divide-[#d5cbb8] border-y border-[#d5cbb8] font-mono text-[10px] tracking-[0.2em] uppercase text-[#8b8272]">
              <div className="flex items-center justify-between py-3">
                <dt>{t.photographs}</dt>
                <dd className="text-[#221f1a]">
                  {formatNumber(count, locale).padStart(2, "0")}
                </dd>
              </div>
              <div className="flex items-center justify-between py-3">
                <dt>{t.firstFrame}</dt>
                <dd className="text-[#221f1a]">
                  {earliest ? earliest.getFullYear() : "—"}
                </dd>
              </div>
              <div className="flex items-center justify-between py-3">
                <dt>{t.latestFrame}</dt>
                <dd className="text-[#221f1a]">
                  {latest ? (formatShortDate(latest, locale) ?? "—") : "—"}
                </dd>
              </div>
            </dl>

            <Link
              href="/upload"
              className={cn(
                buttonVariants({ variant: "link" }),
                "mt-6 h-auto gap-1.5 px-0 font-mono text-[10px] tracking-[0.25em] uppercase text-[#c8452f] hover:text-[#9e3120]"
              )}
            >
              {t.addMemory}
              <ArrowUpRight className="size-3.5" />
            </Link>

            <div className="mt-8 hidden items-center gap-4 lg:flex">
              <div className="flex size-20 -rotate-6 flex-col items-center justify-center rounded-full border border-[#c8452f]/40 text-[#c8452f]">
                <span className="font-mono text-[7px] tracking-[0.25em] uppercase">
                  {t.stampEst}
                </span>
                <span className="font-serif text-xl leading-none italic">
                  {earliest?.getFullYear() ?? "—"}
                </span>
                <span className="mt-0.5 font-mono text-[7px] tracking-[0.25em] uppercase">
                  {t.stampArchive}
                </span>
              </div>
              <p className="max-w-[9rem] font-serif text-sm leading-snug italic text-[#8b8272]">
                {t.stampNote}
              </p>
            </div>
          </div>
        </header>

        <div className="mt-16 flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#8b8272]">
            {t.collection}
          </span>
          <span className="h-px flex-1 bg-[#d5cbb8]" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#8b8272]">
            {formatNumber(count, locale)} {count === 1 ? t.frameOne : t.frameMany}
          </span>
        </div>

        {count === 0 ? (
          <div className="relative mt-10 overflow-hidden border border-dashed border-[#c7bcaa] px-6 py-24 text-center">
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[16rem] leading-none italic text-[#c8452f]/5 select-none"
            >
              {t.titleAccent.charAt(0)}
            </span>
            <div className="relative">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#8b8272]">
                {t.emptyEyebrow}
              </p>
              <h2 className="mt-4 font-serif text-4xl italic tracking-tight">
                {t.emptyTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#6b6356]">
                {t.emptyBody}
              </p>
              <Link
                href="/upload"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "mt-6 h-auto gap-1.5 px-0 font-mono text-[10px] tracking-[0.25em] uppercase text-[#c8452f] hover:text-[#9e3120]"
                )}
              >
                {t.addMemory}
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
            {result.resources.map((img, index) => (
              <div
                key={img.public_id}
                className="mb-10 break-inside-avoid animate-in fade-in-0 duration-700 [animation-fill-mode:both] motion-reduce:animate-none"
                style={{ animationDelay: `${Math.min(index * 60, 540)}ms` }}
              >
                <Card
                  className={cn(
                    "group relative gap-0 overflow-visible rounded-none border-0 bg-[#fbf7ee] py-0 text-[#221f1a] shadow-[0_22px_45px_-28px_rgba(43,35,22,0.7)] ring-0 transition-transform duration-500 ease-out hover:rotate-0",
                    tilts[index % tilts.length]
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -top-2 left-1/2 z-10 h-5 w-20 -translate-x-1/2 bg-[#e6d5a4]/75 shadow-[0_1px_2px_rgba(0,0,0,0.08)] backdrop-blur-[1px]",
                      tapeTilts[index % tapeTilts.length]
                    )}
                  />

                  <CardContent className="px-3 pt-3">
                    <div
                      style={{
                        aspectRatio: `${img.width} / ${img.height}`,
                      }}
                      className="overflow-hidden bg-[#e4dccb]"
                    >
                      <ImageFrame
                        src={img.secure_url || img.url}
                        alt={t.memoryAlt(
                          formatDate(img.created_at, locale) ?? t.undated
                        )}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="h-full w-full saturate-[0.9] transition-all duration-500 group-hover:saturate-100"
                      />
                    </div>
                  </CardContent>

                  <CardFooter className="flex items-end justify-between gap-3 rounded-none border-0 bg-transparent px-4 pt-4 pb-5">
                    <div className="min-w-0">
                      <p className="font-serif text-[15px] leading-snug italic text-[#2b2620]">
                        {formatDate(img.created_at, locale) ?? t.undated}
                      </p>
                      <p className="mt-1 truncate font-mono text-[9px] tracking-[0.18em] uppercase text-[#9c927f]">
                        {t.numberPrefix} {String(index + 1).padStart(3, "0")} ·{" "}
                        {formatName(img.display_name, t.untitled)}
                      </p>
                    </div>
                    <Heart className="size-3.5 shrink-0 text-[#c8452f]/50 transition-colors group-hover:text-[#c8452f]" />
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        )}

        <footer className="mt-20 flex flex-col items-center gap-4 border-t border-[#d5cbb8] pt-8 text-center">
          <span className="text-[#c8452f]">✳</span>
          <p className="font-serif text-2xl italic text-[#4a443a]">
            {t.toBeContinued}
          </p>
          <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-[#8b8272]">
            {t.madeWithLove}
          </p>
        </footer>
      </div>
    </main>
  );
}
