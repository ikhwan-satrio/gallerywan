"use client";

import {
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Heart,
  ImagePlus,
  RotateCcw,
} from "lucide-react";
import {
  initialFormState,
  mergeForm,
  useForm,
  useTransform,
} from "@tanstack/react-form-nextjs";
import { uploadsCloud } from "@/app/upload/actions";
import { getFormOpts } from "@/lib/formOpts/uploads";
import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";

export function UploadForms({
  language,
  copy,
}: {
  language: "en" | "id";
  copy: Dictionary["upload"];
}) {
  const [state, action, isPending] = useActionState(
    uploadsCloud,
    initialFormState
  );
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formOpts = useMemo(() => getFormOpts(language), [language]);

  const form = useForm({
    ...formOpts,
    transform: useTransform((baseForm) => mergeForm(baseForm, state!), [state]),
  });

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const actionState = state as
    | { success?: boolean; error?: string; url?: string }
    | null
    | undefined;
  const actionError =
    typeof actionState?.error === "string" ? actionState.error : null;
  const actionSaved = actionState?.success === true;

  const resetForm = () => {
    form.reset();
    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="relative mx-auto w-full max-w-xl gap-0 overflow-visible rounded-none border border-[#d5cbb8] bg-[#fbf7ee] py-0 text-[#221f1a] shadow-[0_22px_45px_-28px_rgba(43,35,22,0.7)] ring-0">
      <span
        aria-hidden
        className="absolute -top-2.5 left-1/2 z-10 h-5 w-24 -translate-x-1/2 -rotate-2 bg-[#e6d5a4]/75 shadow-[0_1px_2px_rgba(0,0,0,0.08)] backdrop-blur-[1px]"
      />

      <CardHeader className="px-6 pt-8 sm:px-9">
        <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.3em] uppercase text-[#9c927f]">
          {/* <span>{copy.formTitle}</span> */}
          <Heart className="size-3 fill-[#c8452f] text-[#c8452f]" />
        </div>
      </CardHeader>

      <form
        id="add-memory-form"
        action={action as never}
        onSubmit={() => {
          form.handleSubmit();
        }}
      >
        <CardContent className="px-6 sm:px-9">
          <FieldGroup>
            <form.Field
              name="files"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid} className="gap-3">
                    <FieldLabel
                      htmlFor={field.name}
                      className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#8b8272]"
                    >
                      {copy.fileLabel}
                    </FieldLabel>

                    <label
                      htmlFor={field.name}
                      className={cn(
                        "group/upload relative flex aspect-[4/3] w-full cursor-pointer items-center justify-center overflow-hidden border border-dashed border-[#c7bcaa] bg-[#f4eee2] transition-colors duration-300",
                        "hover:border-[#c8452f]/60 hover:bg-[#f0e6d4]",
                        isInvalid && "border-[#c8452f]",
                        preview && "border-solid border-[#d5cbb8]"
                      )}
                    >
                      {preview ? (
                        <>
                          <Image
                            src={preview}
                            alt=""
                            fill
                            unoptimized
                            className="object-cover"
                          />
                          <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover/upload:bg-black/25" />
                          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-[#221f1a]/80 px-3 py-1 font-mono text-[9px] tracking-[0.2em] whitespace-nowrap uppercase text-[#fbf7ee] opacity-0 transition-opacity duration-300 group-hover/upload:opacity-100">
                            {copy.changePhoto}
                          </span>
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-3 px-6 text-center">
                          <span className="flex size-12 items-center justify-center rounded-full border border-[#c7bcaa] text-[#c8452f]">
                            <ImagePlus className="size-5" />
                          </span>
                          <span className="font-serif text-lg italic text-[#2b2620]">
                            {copy.choosePhoto}
                          </span>
                          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#9c927f]">
                            {copy.fileHint}
                          </span>
                        </div>
                      )}

                      <input
                        ref={fileInputRef}
                        id={field.name}
                        name={field.name}
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(event) => {
                          const file = event.target.files?.[0] ?? null;
                          field.handleChange(file!);
                          setPreview(
                            file ? URL.createObjectURL(file) : null
                          );
                        }}
                        onBlur={field.handleBlur}
                      />
                    </label>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </CardContent>

        <CardFooter className="flex-col items-stretch gap-4 rounded-none border-0 bg-transparent px-6 pt-5 pb-8 sm:px-9">
          {actionSaved && (
            <div className="flex flex-wrap items-center gap-2 border border-[#c8452f]/20 bg-[#c8452f]/5 px-4 py-3 font-mono text-[10px] tracking-[0.15em] uppercase text-[#8b3a2a]">
              <Check className="size-3.5" />
              <span>{copy.saved}</span>
              <Link
                href="/"
                className="ml-auto inline-flex items-center gap-1 text-[#c8452f] underline underline-offset-4 hover:text-[#9e3120]"
              >
                {copy.viewAlbum}
                <ArrowUpRight className="size-3" />
              </Link>
            </div>
          )}

          {actionError && (
            <p
              role="alert"
              className="font-mono text-[11px] leading-relaxed text-[#c8452f]"
            >
              {actionError}
            </p>
          )}

          <div className="flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={resetForm}
              className="h-9 px-0 font-mono text-[10px] tracking-[0.2em] uppercase text-[#8b8272] hover:bg-transparent hover:text-[#c8452f]"
            >
              <RotateCcw className="size-3.5" />
              {copy.reset}
            </Button>

            <Button
              type="submit"
              form="add-memory-form"
              disabled={isPending}
              className="h-10 rounded-none bg-[#221f1a] px-5 font-mono text-[10px] tracking-[0.2em] uppercase text-[#fbf7ee] hover:bg-[#c8452f] disabled:opacity-60"
            >
              {isPending ? copy.uploading : copy.submit}
              <ArrowUpRight className="size-4" />
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
