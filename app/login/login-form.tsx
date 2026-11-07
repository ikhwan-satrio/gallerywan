"use client";

import { useActionState } from "react";
import { ArrowRight } from "lucide-react";
import { login, type LoginState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: LoginState = {};

export function LoginForm({
  next,
  copy,
}: {
  next: string;
  copy: { secretWord: string; submit: string; submitting: string };
}) {
  const [state, action, isPending] = useActionState(login, initialState);

  return (
    <form action={action}>
      <input type="hidden" name="next" value={next} />

      <div className="space-y-2">
        <Label
          htmlFor="password"
          className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#8b8272]"
        >
          {copy.secretWord}
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          placeholder="••••••••"
          aria-invalid={Boolean(state.error)}
          className="h-11 rounded-none border-[#cbbfa9] bg-transparent px-3 font-mono text-sm shadow-none focus-visible:border-[#c8452f] focus-visible:ring-[#c8452f]/20 aria-invalid:border-[#c8452f] aria-invalid:ring-[#c8452f]/20 dark:bg-transparent"
        />
      </div>

      {state.error ? (
        <p
          role="alert"
          className="mt-3 font-mono text-[11px] leading-relaxed text-[#c8452f]"
        >
          {state.error}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={isPending}
        className="mt-6 h-11 w-full rounded-none bg-[#221f1a] text-[#fbf7ee] hover:bg-[#c8452f]"
      >
        {isPending ? copy.submitting : copy.submit}
        <ArrowRight className="size-4" />
      </Button>
    </form>
  );
}
