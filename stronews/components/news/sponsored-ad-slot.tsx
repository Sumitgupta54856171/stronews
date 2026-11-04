import { Card, CardContent } from "@/components/ui/card";

type SponsoredAdSlotProps = {
  placement?: "home-sidebar" | "article-inline";
};

export default function SponsoredAdSlot({
  placement = "home-sidebar",
}: SponsoredAdSlotProps) {
  return (
    <Card
      data-ad-placement={placement}
      className="rounded-lg border-dashed border-[#c9c5bb] bg-[#f7f6f2] py-0 shadow-none"
      aria-label="Sponsored placement"
    >
      <CardContent className={`flex ${placement === "article-inline" ? "min-h-[180px]" : "min-h-[250px]"} flex-col justify-between p-4`}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-stone-600">
            Sponsored
          </span>
          <span className="rounded-sm border border-[#dedbd2] px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-stone-500">
            Ad space
          </span>
        </div>
        <div className="py-8 text-center">
          <p className="font-editorial text-xl text-[#183e32]">Partner spotlight</p>
          <p className="mx-auto mt-2 max-w-[220px] text-xs leading-5 text-stone-600">
            A useful, clearly labeled message from a relevant partner will appear here.
          </p>
        </div>
        <p className="text-center text-[9px] text-stone-500">
          Ad placement preview · No ads are live yet
        </p>
      </CardContent>
    </Card>
  );
}
