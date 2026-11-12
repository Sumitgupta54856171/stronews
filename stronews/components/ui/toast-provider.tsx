"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

type ToastKind = "success" | "error" | "info";
type ToastInput = { message: string; kind: ToastKind; id: number };
type ToastContextValue = {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);
const TOAST_DURATION_MS = 5000;

const toastStyles: Record<ToastKind, { icon: typeof CheckCircle2; classes: string }> = {
  success: {
    icon: CheckCircle2,
    classes: "border-emerald-200 bg-white text-emerald-950",
  },
  error: {
    icon: AlertCircle,
    classes: "border-rose-200 bg-white text-rose-950",
  },
  info: {
    icon: Info,
    classes: "border-stone-200 bg-white text-stone-900",
  },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastInput[]>([]);
  const nextId = useRef(0);
  const timers = useRef(new Map<number, number>());

  const dismiss = useCallback((id: number) => {
    const timer = timers.current.get(id);
    if (timer !== undefined) window.clearTimeout(timer);
    timers.current.delete(id);
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback((kind: ToastKind, message: string) => {
    const id = ++nextId.current;
    setToasts((current) => [...current.slice(-3), { id, kind, message }]);
    timers.current.set(id, window.setTimeout(() => dismiss(id), TOAST_DURATION_MS));
  }, [dismiss]);

  const value = useMemo<ToastContextValue>(() => ({
    success: (message) => show("success", message),
    error: (message) => show("error", message),
    info: (message) => show("info", message),
  }), [show]);

  useEffect(() => () => {
    for (const timer of timers.current.values()) window.clearTimeout(timer);
    timers.current.clear();
  }, []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4 sm:left-auto sm:right-5 sm:w-96 sm:items-end sm:px-0">
        {toasts.map((toast) => {
          const { icon: Icon, classes } = toastStyles[toast.kind];
          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex w-full items-start gap-3 rounded-lg border px-4 py-3 shadow-lg ${classes}`}
              role={toast.kind === "error" ? "alert" : "status"}
            >
              <Icon className={`mt-0.5 size-4 shrink-0 ${toast.kind === "success" ? "text-emerald-700" : toast.kind === "error" ? "text-rose-700" : "text-stone-500"}`} />
              <p className="min-w-0 flex-1 text-sm leading-5">{toast.message}</p>
              <button
                type="button"
                aria-label="Dismiss notification"
                className="rounded p-0.5 text-current/60 hover:bg-black/5 hover:text-current"
                onClick={() => dismiss(toast.id)}
              >
                <X className="size-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider.");
  return context;
}
