import { QueryClient } from "@tanstack/react-query";
import { API_BASE } from "@/config";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const url = queryKey[0] as string;
        const fullUrl = url.startsWith("http") ? url : `${API_BASE}${url}`;
        const res = await fetch(fullUrl, {
          credentials: "include",
          cache: "no-cache",
          headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
        });
        if (res.status === 401) return null;
        if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
        return res.json();
      },
      retry: 1,
    },
  },
});
