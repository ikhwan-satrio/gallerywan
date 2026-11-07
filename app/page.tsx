import type { Metadata } from "next";
import { Gallery } from "@/components/gallery";
import { getDictionary, getLanguage, getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDictionary(getLanguage(locale)).gallery;

  return {
    title: t.metadataTitle,
    description: t.metadataDescription,
  };
}

// Always show the latest uploads instead of a build-time snapshot.
export const dynamic = "force-dynamic";

export default function Home() {
  return <Gallery />;
}
