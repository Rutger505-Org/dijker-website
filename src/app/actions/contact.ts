"use server";

import { env } from "@/env";
import nodemailer from "nodemailer";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(5000),
});

export type ContactState = {
  status: "idle" | "success" | "error";
};

const transporter = nodemailer.createTransport({
  host: env.AUTH_EMAIL_HOST,
  port: env.AUTH_EMAIL_PORT,
  auth: {
    user: env.AUTH_EMAIL_USER,
    pass: env.AUTH_EMAIL_PASSWORD,
  },
  secure: true,
});

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = schema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { status: "error" };
  }

  const { firstName, lastName, email, phone, message } = parsed.data;

  try {
    const result = await transporter.sendMail({
      to: env.AUTH_EMAIL_USER,
      from: `${env.AUTH_EMAIL_FROM} <${env.AUTH_EMAIL_USER}>`,
      replyTo: email,
      subject: `the dijker — new contact from ${firstName} ${lastName}`,
      text: [
        `Name: ${firstName} ${lastName}`,
        `Email: ${email}`,
        `Phone: ${phone ?? ""}`,
        "",
        message,
      ].join("\n"),
    });

    if (result.rejected.length || !result.messageId) {
      console.error("Contact email rejected", result);
      return { status: "error" };
    }

    return { status: "success" };
  } catch (error) {
    console.error("Contact email failed", error);
    return { status: "error" };
  }
}
