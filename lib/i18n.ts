import { headers } from "next/headers";

export type Language = "en" | "id";

const en = {
  gallery: {
    archiveLabel: "A private archive",
    volume: "Volume 01 · The collection",
    titleLead: "Our",
    titleAccent: "Memories",
    intro:
      "The small, ordinary days we never want to forget — kept here, one frame at a time.",
    photographs: "Photographs",
    firstFrame: "First frame",
    latestFrame: "Latest frame",
    addMemory: "Add a memory",
    collection: "The collection",
    frameOne: "frame",
    frameMany: "frames",
    emptyEyebrow: "Frame 000",
    emptyTitle: "The album is still blank.",
    emptyBody: "Add the first frame, and let the story begin.",
    emptyCta: "Add a memory",
    undated: "Undated",
    untitled: "Untitled",
    numberPrefix: "No.",
    memoryAlt: (date: string) => `A memory from ${date}`,
    storyInFrames: (year: string) => `est. ${year} — a story in frames`,
    stampEst: "est.",
    stampArchive: "archive",
    stampNote: "a story told in frames",
    toBeContinued: "to be continued…",
    madeWithLove: "Made with love, only for us",
    metadataTitle: "Our Memories — A Private Archive",
    metadataDescription:
      "An archive of the small, ordinary days we never want to forget.",
  },
  login: {
    eyebrow: "Private entrance",
    welcomeLead: "Welcome",
    welcomeAccent: "back.",
    description:
      "This little archive is just for the two of us. Enter our secret word to add a memory.",
    secretWord: "Secret word",
    submit: "Unlock the album",
    submitting: "Opening…",
    errorPassword: "That secret word doesn't match. Try again.",
    errorConfig: "Login is not configured yet.",
    errorSession: "Could not create a session.",
    configTitle: "Login is not configured yet.",
    configBody:
      "Set ALBUM_PASSWORD and AUTH_SECRET in your secret profile, then restart the app.",
    seeAlbum: "Just looking? See the album",
    metadataTitle: "Private Entrance — Our Memories",
    metadataDescription: "A private door into our little archive.",
  },
  upload: {
    metadataTitle: "Add a Memory — Our Memories",
    metadataDescription: "A private place to add a new frame to our archive.",
    signOut: "Sign out",
    archiveLabel: "A private archive",
    eyebrow: "A new page",
    titleLead: "Add a",
    titleAccent: "memory",
    intro:
      "Every memory starts with a small moment. Choose a photo, and we will keep it safe in our little archive.",
    nextMemory: "your next memory",
    formTitle: "Add a memory",
    fileLabel: "The photograph",
    choosePhoto: "Choose a photo",
    changePhoto: "Choose another",
    fileHint: "JPG or PNG · up to 2MB",
    uploading: "Saving…",
    backToAlbum: "Back to the album",
    saved: "Memory saved.",
    viewAlbum: "View the album",
    reset: "Reset",
    submit: "Keep this memory",
    errors: {
      signIn: "You need to sign in to upload.",
      noFormData: "Form data not found.",
      invalidFile: "Invalid or empty file.",
      required: "Please choose a file to upload.",
      failed: "Something went wrong while uploading.",
    },
  },
};

export type Dictionary = typeof en;

const id: Dictionary = {
  gallery: {
    archiveLabel: "Arsip pribadi",
    volume: "Volume 01 · Koleksi",
    titleLead: "Kenangan",
    titleAccent: "Kita",
    intro:
      "Hari-hari kecil yang biasa kita lalui — disimpan di sini, satu bingkai setiap kali.",
    photographs: "Foto",
    firstFrame: "Bingkai pertama",
    latestFrame: "Bingkai terbaru",
    addMemory: "Tambah kenangan",
    collection: "Koleksi",
    frameOne: "bingkai",
    frameMany: "bingkai",
    emptyEyebrow: "Bingkai 000",
    emptyTitle: "Album ini masih kosong.",
    emptyBody: "Tambahkan bingkai pertama, dan biarkan ceritanya dimulai.",
    emptyCta: "Tambah kenangan",
    undated: "Tanpa tanggal",
    untitled: "Tanpa judul",
    numberPrefix: "No.",
    memoryAlt: (date) => `Kenangan dari ${date}`,
    storyInFrames: (year) => `sejak ${year} — cerita dalam bingkai`,
    stampEst: "sejak",
    stampArchive: "arsip",
    stampNote: "cerita yang dirangkai dalam bingkai",
    toBeContinued: "bersambung…",
    madeWithLove: "Dibuat dengan cinta, hanya untuk kita",
    metadataTitle: "Kenangan Kita — Arsip Pribadi",
    metadataDescription:
      "Arsip hari-hari kecil yang tidak ingin kita lupakan.",
  },
  login: {
    eyebrow: "Pintu pribadi",
    welcomeLead: "Selamat datang",
    welcomeAccent: "kembali.",
    description:
      "Arsip kecil ini hanya untuk kita berdua. Masukkan kata rahasia kita untuk menambah kenangan.",
    secretWord: "Kata rahasia",
    submit: "Buka album",
    submitting: "Membuka…",
    errorPassword: "Kata rahasianya tidak cocok. Coba lagi.",
    errorConfig: "Login belum dikonfigurasi.",
    errorSession: "Tidak bisa membuat sesi.",
    configTitle: "Login belum dikonfigurasi.",
    configBody:
      "Setel ALBUM_PASSWORD dan AUTH_SECRET di secret profile, lalu restart aplikasi.",
    seeAlbum: "Cuma mau lihat? Buka album",
    metadataTitle: "Pintu Pribadi — Kenangan Kita",
    metadataDescription: "Pintu pribadi menuju arsip kecil kita.",
  },
  upload: {
    metadataTitle: "Tambah Kenangan — Kenangan Kita",
    metadataDescription: "Tempat pribadi untuk menambah bingkai baru ke arsip kita.",
    signOut: "Keluar",
    archiveLabel: "Arsip pribadi",
    eyebrow: "Halaman baru",
    titleLead: "Tambah",
    titleAccent: "kenangan",
    intro:
      "Setiap kenangan dimulai dari momen kecil. Pilih foto, dan kita simpan baik-baik di arsip kecil kita.",
    nextMemory: "kenangan berikutnya",
    formTitle: "Tambah kenangan",
    fileLabel: "Fotonya",
    choosePhoto: "Pilih foto",
    changePhoto: "Pilih foto lain",
    fileHint: "JPG atau PNG · maksimal 2MB",
    uploading: "Menyimpan…",
    backToAlbum: "Kembali ke album",
    saved: "Kenangan tersimpan.",
    viewAlbum: "Lihat album",
    reset: "Reset",
    submit: "Simpan kenangan ini",
    errors: {
      signIn: "Kamu harus masuk dulu untuk mengunggah.",
      noFormData: "Form data tidak ditemukan.",
      invalidFile: "File tidak valid atau kosong.",
      required: "File wajib diunggah.",
      failed: "Terjadi kesalahan saat upload.",
    },
  },
};

const dictionaries: Record<Language, Dictionary> = { en, id };

export function getLanguage(locale: string): Language {
  return locale.toLowerCase().startsWith("id") ? "id" : "en";
}

export function getDictionary(language: Language): Dictionary {
  return dictionaries[language];
}

export async function getLocale() {
  const headerStore = await headers();
  const acceptLanguage = headerStore.get("accept-language") ?? "";

  const candidates = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const quality = params.find((param) => param.trim().startsWith("q="));
      const q = quality ? Number(quality.split("=")[1]) : 1;

      return { tag: tag.trim(), q: Number.isFinite(q) ? q : 1 };
    })
    .filter((candidate) => candidate.q > 0)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of candidates) {
    const language = tag.toLowerCase().split("-")[0];
    if ((language === "id" || language === "en") && isLocaleTag(tag)) {
      return tag;
    }
  }

  return "en";
}

function isLocaleTag(value: string) {
  return /^[a-z]{2,3}(-[a-z0-9]{2,8})*$/i.test(value);
}

export function formatDate(value: Date | string, locale: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatShortDate(value: Date | string, locale: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatNumber(value: number, locale: string) {
  return new Intl.NumberFormat(locale).format(value);
}
