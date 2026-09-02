import { QueryCache, QueryClient } from "@tanstack/react-query";
import { setModal, store } from "@/store";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 10, retry: 1 } },
  queryCache: new QueryCache({
    onError: (error, query) => {
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
  // XXX: 預留之後useMutation失敗時的通用錯誤處理
  // mutationCache: new MutationCache({
  //   onError: () => store.dispatch(setModal(/* ... */)),
  // }),
});

// for react-query devtool
window.__TANSTACK_QUERY_CLIENT__ = queryClient;
