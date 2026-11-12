import { Mail } from "lucide-react";

type ContactDetailsProps = {
  email?: string;
  children?: React.ReactNode;
};

export default function ContactDetails({ email, children }: ContactDetailsProps) {
  return (
    <div className="rounded-xl border border-[#e2dfd7] bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e6eee9] text-emerald-800">
          <Mail className="size-4" />
        </span>
        <div className="min-w-0">
          {email ? (
            <a
              href={`mailto:${email}`}
              className="font-medium text-emerald-900 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-700"
            >
              {email}
            </a>
          ) : (
            <p className="font-medium text-[#303330]">Email address being published</p>
          )}
          {children && <div className="mt-2 text-sm leading-6 text-stone-600">{children}</div>}
        </div>
      </div>
    </div>
  );
}
