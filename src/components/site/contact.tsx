"use client";

import { submitContact, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("contact");
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? t("sending") : t("send")}
    </Button>
  );
}

export function Contact() {
  const t = useTranslations("contact");
  const [state, formAction] = useActionState<ContactState, FormData>(
    submitContact,
    { status: "idle" },
  );

  return (
    <section id="contact" className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-2xl px-6 py-20 md:py-28">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {t("heading")}
        </h2>
        <p className="mt-4 text-muted-foreground">{t("sub")}</p>

        {state.status === "success" ? (
          <p
            role="status"
            className="mt-8 rounded-lg border border-border bg-background p-4 text-sm font-medium"
          >
            {t("success")}
          </p>
        ) : (
          <form action={formAction} className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t("firstName")} *</Label>
                <Input id="firstName" name="firstName" required maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t("lastName")} *</Label>
                <Input id="lastName" name="lastName" required maxLength={100} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("email")} *</Label>
              <Input id="email" name="email" type="email" required maxLength={200} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t("phone")}</Label>
              <Input id="phone" name="phone" type="tel" maxLength={50} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">{t("message")} *</Label>
              <textarea
                id="message"
                name="message"
                required
                maxLength={5000}
                rows={5}
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>

            {state.status === "error" && (
              <p role="alert" className="text-sm text-destructive">
                {t("error")}
              </p>
            )}

            <div className="flex items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">* {t("required")}</p>
              <SubmitButton />
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
