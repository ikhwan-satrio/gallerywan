import { type } from "arktype";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

type Messages = {
  invalidType: string;
  tooLarge: string;
};

const messages: Record<"en" | "id", Messages> = {
  en: {
    invalidType: "a valid image file (PNG, JPG, etc.)",
    tooLarge: "a file smaller than 2MB",
  },
  id: {
    invalidType: "file gambar yang valid (PNG, JPG, dll)",
    tooLarge: "ukuran file kurang dari 2MB",
  },
};

export function createUploadsFileSchema(language: "en" | "id") {
  const text = messages[language];

  return type({
    files: ["instanceof", File],
  }).narrow(({ files }, ctx) => {
    if (!files.type.startsWith("image/")) {
      return ctx.reject(text.invalidType);
    }

    if (files.size > MAX_FILE_SIZE) {
      return ctx.reject(text.tooLarge);
    }

    return true;
  });
}
