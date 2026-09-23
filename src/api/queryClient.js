import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { useModalStore } from "@/store/useModalStore";

const { setModal } = useModalStore.getState();

export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 30, retry: 1 } },
  queryCache: new QueryCache({
    onError: (_error, query) => {
      if (query.state.data !== undefined) return;
      if (query.meta?.skipGlobalError) return;
      setModal({
        modalType: "error",
        errorMsg:
          "Fetching data failed. Please check your internet and try again.",
      });
    },
  }),
  mutationCache: new MutationCache({
    onError: (_error, _variables, _context, mutation) => {
      if (mutation.meta?.skipGlobalError) return;
      setModal({
        modalType: "error",
        errorMsg:
          "Change is invalid. Please check your internet and try again.",
      });
    },
  }),
});

// for react-query devtool
window.__TANSTACK_QUERY_CLIENT__ = queryClient;
