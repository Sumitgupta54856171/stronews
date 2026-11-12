import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Trend } from "@/lib/news/types";

export default function TrendRail({ trends, onSelect }: { trends: Trend[]; onSelect: (articleId: string) => void }) {
  const mostRead = trends
    .filter((trend) => trend.views > 0)
    .toSorted((left, right) => right.views - left.views)
    .slice(0, 4);

  return <aside className="space-y-4"><Card className="rounded-lg border-[#e3e0d8] bg-white py-0 shadow-none"><CardHeader className="border-b border-[#ebe8e1] px-4 py-3"><CardTitle className="flex items-center gap-2 text-sm font-bold"><TrendingUp className="size-4 text-emerald-800" /> Most read stories</CardTitle></CardHeader>
    <CardContent className="px-4 py-1">{mostRead.length > 0 ? mostRead.map((trend, index) => <button key={trend.articleId} className="grid w-full grid-cols-[24px_minmax(0,1fr)] items-center gap-2 border-b border-[#efede8] py-3 text-left last:border-0" onClick={() => onSelect(trend.articleId)}><span className="font-mono text-[10px] text-stone-400">{String(index + 1).padStart(2, "0")}</span><span className="min-w-0"><span className="block truncate text-xs font-semibold text-stone-800">{trend.query}</span><span className="mt-1 flex items-center gap-1.5"><Badge className="h-4 rounded-sm bg-emerald-50 px-1 font-mono text-[9px] text-emerald-900 hover:bg-emerald-50">{trend.views.toLocaleString()} views</Badge></span></span></button>) : <p className="py-4 text-xs leading-5 text-stone-500">Stories will appear here after they receive views.</p>}</CardContent>
    {mostRead.length > 0 && <div className="border-t border-[#ebe8e1] p-3"><p className="text-[10px] leading-4 text-stone-500">Stories ranked by actual reader views.</p></div>}</Card>
    <Card className="rounded-lg border-[#d5e0d8] bg-[#e8f0eb] py-0 shadow-none"><CardContent className="p-4"><span className="text-[10px] font-bold uppercase tracking-[0.13em] text-emerald-900">The brief</span><p className="font-editorial mt-2 text-xl leading-tight text-[#183e32]">The stories moving the conversation, without the noise.</p><div className="mt-4 flex items-center gap-1 text-[10px] font-semibold text-emerald-950">Five-minute morning read <ArrowUpRight className="size-3" /></div></CardContent></Card>
  </aside>;
}