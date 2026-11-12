"use client";

import { useEffect, useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { makeStore } from "@/lib/store/store";
import { ToastProvider } from "@/components/ui/toast-provider";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [store] = useState(() => makeStore());

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const hadServiceWorkerController = Boolean(navigator.serviceWorker.controller);
    void navigator.serviceWorker.getRegistrations()
      .then((registrations) => Promise.all(
        registrations.map((registration) => {
          const worker =
            registration.active ?? registration.waiting ?? registration.installing;
          if (!worker) return false;
          const workerUrl = new URL(worker.scriptURL);
          if (
            workerUrl.origin !== window.location.origin ||
            workerUrl.pathname !== "/sw.js"
          ) {
            return false;
          }
          return registration.unregister();
        }),
      ))
      .then((unregistered) => {
        if (hadServiceWorkerController && unregistered.some(Boolean)) {
          window.location.reload();
        }
      })
      .catch((error: unknown) => {
        console.error("Could not remove the previous service worker.", error);
      });
  }, []);

  return (
    <ToastProvider>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </ReduxProvider>
    </ToastProvider>
  );
}