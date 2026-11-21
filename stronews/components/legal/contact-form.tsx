"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast-provider";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      if (!response.ok) {
        const msg = res.error || "Failed to send your message. Please try again.";
        setError(msg);
        toast.error(msg);
        return;
      }

      setSubmitted(true);
      toast.success("Your message has been sent successfully.");
    } catch {
      const msg = "Unable to connect to the server. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-6 text-center">
        <CheckCircle2 className="mx-auto size-10 text-emerald-700" />
        <h3 className="mt-3 text-lg font-semibold text-emerald-950">Message Received</h3>
        <p className="mt-2 text-sm text-emerald-800">
          Thank you for reaching out to Stronews. Our team will review your enquiry and respond to
          your email address as soon as possible.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => setSubmitted(false)}
          className="mt-5 border-emerald-300 text-emerald-900 hover:bg-emerald-100"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-[#dedbd2] bg-white p-6 shadow-sm sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5 text-xs font-semibold uppercase tracking-wider text-stone-700">
          Your Name <span className="text-rose-600">*</span>
          <Input
            required
            name="name"
            placeholder="e.g. Rahul Sharma"
            className="h-10 bg-white"
          />
        </label>
        <label className="block space-y-1.5 text-xs font-semibold uppercase tracking-wider text-stone-700">
          Email Address <span className="text-rose-600">*</span>
          <Input
            required
            type="email"
            name="email"
            placeholder="you@example.com"
            className="h-10 bg-white"
          />
        </label>
      </div>

      <label className="block space-y-1.5 text-xs font-semibold uppercase tracking-wider text-stone-700">
        Inquiry Category
        <select
          name="subject"
          className="h-10 w-full rounded-md border border-[#dedbd2] bg-white px-3 text-sm text-stone-900 outline-none transition focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
        >
          <option value="General Inquiry">General Inquiry & Feedback</option>
          <option value="Editorial Correction">Editorial Correction / News Tip</option>
          <option value="Advertising & Sponsorship">Advertising & Sponsorship</option>
          <option value="Privacy & Legal">Privacy & Data Rights Request</option>
        </select>
      </label>

      <label className="block space-y-1.5 text-xs font-semibold uppercase tracking-wider text-stone-700">
        Your Message <span className="text-rose-600">*</span>
        <textarea
          required
          rows={5}
          name="message"
          placeholder="Please describe your enquiry, news tip, or correction details..."
          className="w-full rounded-md border border-[#dedbd2] bg-white p-3 text-sm text-stone-900 outline-none transition focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
        />
      </label>

      {error && (
        <div className="flex items-center gap-2 text-sm text-rose-700">
          <AlertCircle className="size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-10 w-full bg-[#176f58] text-white hover:bg-[#125943] sm:w-auto sm:px-6"
      >
        {isSubmitting ? (
          "Sending..."
        ) : (
          <span className="flex items-center gap-2">
            Send Message <Send className="size-3.5" />
          </span>
        )}
      </Button>
    </form>
  );
}
