import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api/queryClient";
import App from "@/App";
import "./scss/global.scss";

const element = document.querySelector("#root");

if (!element) throw new Error("Root element not found");

createRoot(element).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
