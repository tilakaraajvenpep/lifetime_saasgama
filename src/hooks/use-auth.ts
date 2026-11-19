import { useQuery } from "@tanstack/react-query";
import { API_BASE } from "@/config";

interface AuthUser {
  id: number;
  fullName?: string;
  isSuperAdmin?: boolean;
  [key: string]: unknown;
}

// Cross-origin auth check against the main app -- works only once the
// backend's session cookie is shared across subdomains (COOKIE_DOMAIN set
// to e.g. ".saasgama.com") and CORS allows this origin with credentials.
// Until then this safely resolves to "not authenticated", which just means
// every visitor here goes through the normal guest checkout path.
export function useAuth() {
  const { data: user, isLoading } = useQuery<AuthUser | null>({
    queryKey: ["auth-user"],
    queryFn: async () => {
      try {
        const res = await fetch(`${API_BASE}/api/user`, {
          credentials: "include",
          cache: "no-cache",
        });
        if (!res.ok) return null;
        return res.json();
      } catch {
        return null;
      }
    },
    staleTime: 0,
    retry: 0,
  });

  return {
    user: user || null,
    isAuthenticated: !!user,
    isLoading,
  };
}
