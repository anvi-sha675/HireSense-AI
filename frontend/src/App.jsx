import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/lib/theme-provider";
import { CustomCursor } from "@/components/common/custom-cursor";
import { CommandPalette } from "@/components/common/command-palette";
import AppRoutes from "@/routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <CustomCursor />
          <CommandPalette />
          <AppRoutes />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "rgb(var(--surface))",
                color: "rgb(var(--fg))",
                border: "1px solid rgb(var(--border))",
                borderRadius: "0.875rem",
                fontSize: "0.875rem",
              },
            }}
          />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
