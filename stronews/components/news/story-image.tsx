import Image from "next/image";

export default function StoryImage({ src, alt, priority = false, className = "" }: { src: string; alt: string; priority?: boolean; className?: string }) {
  const isStoredImage = src.startsWith("/api/news/images/");
  let isReferenceImage = false;
  try {
    isReferenceImage = new URL(src).hostname === "images.unsplash.com";
  } catch {
    isReferenceImage = false;
  }

  if (!isStoredImage && !isReferenceImage) {
    return <div role="img" aria-label={alt} className={`absolute inset-0 flex items-center justify-center bg-[#e8ece8] text-xs text-stone-500 ${className}`}>Image unavailable</div>;
  }

  return <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px" className={`object-cover ${className}`} />;
}