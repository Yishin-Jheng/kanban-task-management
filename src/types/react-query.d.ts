import type { QueryClient } from "@tanstack/react-query";

declare module "@tanstack/react-query" {
  interface Register {
    queryMeta: { skipGlobalError?: boolean };
    mutationMeta: { skipGlobalError?: boolean };
  }
}

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: QueryClient;
  }
}
