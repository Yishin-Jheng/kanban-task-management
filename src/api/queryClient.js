import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { setModal, store } from "@/store";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 30, retry: 1 } },
  queryCache: new QueryCache({
    onError: (_, query) => {
      if (query.state.data !== undefined) return;
      if (query.meta?.skipGlobalError) return;
      store.dispatch(
        setModal({
          isOpen: true,
          whichOpen: "errorMessageModal",
          errorMsg:
            "Fetching data failed. Please check your internet and try again.",
        }),
      );
    },
  }),
  mutationCache: new MutationCache({
    onError: (_, arg) => {
      if (arg?.skipGlobalError) return;
      store.dispatch(
        setModal({
          isOpen: true,
          whichOpen: "errorMessageModal",
          errorMsg:
            "Change is invalid. Please check your internet and try again.",
        }),
      );
    },
  }),
});

// for react-query devtool
window.__TANSTACK_QUERY_CLIENT__ = queryClient;
