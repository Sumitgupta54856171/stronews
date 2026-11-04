"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { makeStore } from "@/lib/store/store";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [store] = useState(() => makeStore());

  return <ReduxProvider store={store}><QueryClientProvider client={queryClient}>{children}</QueryClientProvider></ReduxProvider>;
}