"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { motion } from "framer-motion";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { contactSchema, type ContactFormValues } from "./schema";
import { SendButton } from "./send-button";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),

    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const message = watch("message") ?? "";

  async function onSubmit(values: ContactFormValues) {
    try {
      setLoading(true);

      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error();
      }

      toast.success("Message sent successfully.");

      reset();
    } catch {
      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{
        opacity: 0,
        x: 40,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
      }}
      className="
        rounded-3xl
        border
        bg-background/70
        p-6 sm:p-8
        shadow-xl
        backdrop-blur-xl
        space-y-6
      "
    >
      {/* Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Full Name
        </label>

        <Input
          placeholder="John Doe"
          {...register("name")}
        />

        {errors.name && (
          <p className="text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Email Address
        </label>

        <Input
          type="email"
          placeholder="john@example.com"
          {...register("email")}
        />

        {errors.email && (
          <p className="text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Subject
        </label>

        <Input
          placeholder="Project Inquiry"
          {...register("subject")}
        />

        {errors.subject && (
          <p className="text-sm text-red-500">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Message
        </label>

        <Textarea
          rows={7}
          maxLength={1000}
          placeholder="Tell me about your project..."
          {...register("message")}
        />

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            {errors.message?.message}
          </span>

          <span>
            {message.length}/1000
          </span>
        </div>
      </div>

      <SendButton loading={loading} />
    </motion.form>
  );
}