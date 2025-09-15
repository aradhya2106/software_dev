"use client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc } from '../utils/trpc';
import { httpBatchLink } from '../utils/trpc-links';
import React from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Only retry failed queries once
      refetchOnWindowFocus: false,
    },
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({ 
      url: `${typeof window !== 'undefined' ? window.location.origin : ''}/api/trpc`,
    }),
  ],
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
