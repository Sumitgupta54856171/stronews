"use client";

import { useState, type FormEvent } from "react";
import { isAxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Plus, Trash2, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectList,
  SelectScrollDownArrow,
  SelectScrollUpArrow,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/toast-provider";
import { createArticle } from "@/lib/api";
import {
  NEWS_CATEGORIES,
  type CreateNewsInput,
  type NewsCategory,
} from "@/lib/news/types";

type UploadVariables = {
  article: CreateNewsInput;
  imageFile: File;
  sectionImageFiles: (File | null)[];
};

export default function UploadForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [sectionCount, setSectionCount] = useState(1);
  const [category, setCategory] = useState<NewsCategory | null>(null);
  const toast = useToast();
  const mutation = useMutation({
    mutationFn: ({ article, imageFile, sectionImageFiles }: UploadVariables) => createArticle(article, imageFile, sectionImageFiles),
    onSuccess: async (article) => {
      await queryClient.invalidateQueries({ queryKey: ["news"] });
      toast.success("Story published successfully.");
      router.push(`/news/${encodeURIComponent(article.id)}`);
    },
    onError: (reason) => {
      toast.error(isAxiosError<{ error?: string }>(reason)
        ? reason.response?.data?.error ?? "Unable to upload this story."
        : "Unable to upload this story. Please try again.");
    },
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const summary = String(formData.get("summary") ?? "").trim();
    const imageFile = formData.get("image");
    if (!category) {
      toast.error("Choose a news desk before publishing.");
      return;
    }
    if (!(imageFile instanceof File) || imageFile.size === 0) {
      toast.error("Choose a story image file before publishing.");
      return;
    }
    const sections = Array.from({ length: sectionCount }, (_, index) => ({
      paragraphs: String(formData.get(`section-body-${index}`) ?? "")
        .split("\n\n")
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
      image: "",
      mediaUrl: String(formData.get(`section-media-${index}`) ?? "").trim(),
    }));
    const sectionImageFiles = Array.from({ length: sectionCount }, (_, index) => {
      const file = formData.get(`section-image-${index}`);
      return file instanceof File && file.size > 0 ? file : null;
    });
    const bodyParagraphs = sections.flatMap((section) => section.paragraphs);

    mutation.mutate({ article: {
      title: String(formData.get("title") ?? "").trim(),
      category,
      isBreaking: formData.get("isBreaking") === "on",
      trendQuery: String(formData.get("title") ?? "").trim(),
      trendSpike: "+0%",
      readTime: `${Math.max(1, Math.ceil(bodyParagraphs.join(" ").split(/\s+/).length / 220))} min read`,
      subtitle: String(formData.get("subtitle") ?? "").trim(),
      image: "",
      author: {
        name: String(formData.get("author") ?? "").trim(),
        role: "News desk",
        avatar: "",
      },
      keyStat: {
        value: String(formData.get("statValue") ?? "").trim(),
        label: String(formData.get("statLabel") ?? "").trim(),
      },
      aiSummary: summary ? summary.split("\n").map((line) => line.trim()).filter(Boolean) : [],
      sixtyWordSummary: String(formData.get("sixtyWordSummary") ?? "").trim(),
      bodyParagraphs,
      sections,
    }, imageFile, sectionImageFiles });
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-7 sm:px-7 sm:py-10">
      <Link href="/" className="mb-5 inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-emerald-900"><ArrowLeft className="size-3.5" /> Back to feed</Link>
      <div className="mb-5"><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-800">Publisher desk</p><h1 className="font-editorial mt-1 text-4xl">Upload a story</h1><p className="mt-2 text-sm text-stone-600">Create a story page and publish it to the stronews feed.</p></div>
      <Card className="rounded-lg border-[#e3e0d8] bg-white py-0 shadow-sm">
        <CardHeader className="border-b border-[#ebe8e1] px-5 py-4"><CardTitle className="text-sm">Story details</CardTitle></CardHeader>
        <CardContent className="p-5">
          <form className="space-y-4" onSubmit={submit}>
            <label className="block space-y-1.5 text-xs font-medium">Headline<Input name="title" required maxLength={180} placeholder="Write a clear, specific headline" /></label>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium" htmlFor="story-category">Category</label>
                <Select
                  items={NEWS_CATEGORIES.slice(1).map((newsCategory) => ({
                    value: newsCategory,
                    label: newsCategory,
                  }))}
                  name="category"
                  onValueChange={(value) => setCategory(value)}
                  required
                  value={category}
                >
                  <SelectTrigger id="story-category">
                    <SelectValue placeholder="Choose a desk" />
                    <SelectIcon />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectScrollUpArrow />
                    <SelectList>
                      {NEWS_CATEGORIES.slice(1).map((newsCategory) => (
                        <SelectItem key={newsCategory} value={newsCategory}>
                          {newsCategory}
                        </SelectItem>
                      ))}
                    </SelectList>
                    <SelectScrollDownArrow />
                  </SelectContent>
                </Select>
              </div>
              <label className="block space-y-1.5 text-xs font-medium sm:col-span-2">Story image file<Input name="image" type="file" accept="image/jpeg,image/png,image/webp" required className="h-auto py-2 file:mr-3 file:rounded-sm file:border-0 file:bg-[#e8f0eb] file:px-2 file:py-1 file:text-xs file:font-semibold file:text-emerald-900" /><span className="block text-[10px] font-normal text-stone-500">JPEG, PNG, or WebP. Maximum file size: 8 MB.</span></label>
            </div>
            <label className="block space-y-1.5 text-xs font-medium">Deck / subtitle<textarea name="subtitle" required maxLength={500} rows={2} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="One sentence that adds context to the headline" /></label>
            <label className="block space-y-1.5 text-xs font-medium">Author name<Input name="author" required maxLength={100} defaultValue="stronews" /></label>
            <div className="grid gap-4 sm:grid-cols-2"><label className="block space-y-1.5 text-xs font-medium">Key figure<Input name="statValue" maxLength={40} placeholder="e.g. 180 km/h" /></label><label className="block space-y-1.5 text-xs font-medium">Figure label<Input name="statLabel" maxLength={100} placeholder="What the number measures" /></label></div>
            <label className="block space-y-1.5 text-xs font-medium">Short summary<textarea name="sixtyWordSummary" rows={3} maxLength={1200} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="A concise summary for the brief view" /></label>
            <label className="block space-y-1.5 text-xs font-medium">Summary points<textarea name="summary" rows={3} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="One point per line" /></label>
            <div className="space-y-4 border-t border-[#ebe8e1] pt-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div><h2 className="text-sm font-semibold">Story sections</h2><p className="mt-1 text-[10px] text-stone-500">All sections appear together on one story page. Add an inline image or media link where it belongs.</p></div>
                <div className="flex items-center gap-2">
                  {sectionCount > 1 && (
                    <Button
                      aria-label="Remove last section"
                      onClick={() => {
                        setSectionCount((count) => count - 1);
                      }}
                      size="icon-sm"
                      type="button"
                      variant="outline"
                    >
                      <Trash2 />
                    </Button>
                  )}
                  <Button
                    disabled={sectionCount >= 30}
                    onClick={() => {
                      setSectionCount((count) => Math.min(30, count + 1));
                    }}
                    size="sm"
                    type="button"
                    variant="outline"
                  >
                    <Plus /> Add section
                  </Button>
                </div>
              </div>
              {Array.from({ length: sectionCount }, (_, index) => (
                <section key={index} className="space-y-3 border-t border-dashed border-[#dedbd2] pt-4">
                  <h3 className="font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-900">Section {index + 1}</h3>
                  <label className="block space-y-1.5 text-xs font-medium">Story text<textarea name={`section-body-${index}`} required rows={6} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Write this part of the story. Separate paragraphs with a blank line." /></label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block space-y-1.5 text-xs font-medium">Inline image (optional)<Input name={`section-image-${index}`} type="file" accept="image/jpeg,image/png,image/webp" className="h-auto py-2 file:mr-2 file:rounded-sm file:border-0 file:bg-[#e8f0eb] file:px-2 file:py-1 file:text-[10px] file:font-semibold file:text-emerald-900" /></label>
                    <label className="block space-y-1.5 text-xs font-medium">Media link (optional)<Input name={`section-media-${index}`} type="url" placeholder="https://..." /></label>
                  </div>
                </section>
              ))}
            </div>
            <label className="flex items-center gap-2 text-xs font-medium"><input name="isBreaking" type="checkbox" className="size-4 accent-emerald-800" /> Mark as breaking</label>
            <div className="flex justify-end border-t border-[#ebe8e1] pt-4"><Button type="submit" disabled={mutation.isPending} className="bg-[#176f58]"><Upload />{mutation.isPending ? "Publishing…" : "Publish story"}</Button></div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
