import { defineStore } from "pinia";
import { useApi } from "~/shared/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: useCookie("token").value ?? null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    async register(email: string, password: string, rememberMe = false) {
      const api = useApi();
      const data = await api<{ access_token: string }>("/auth/register", {
        method: "POST",
        body: { email, password },
      });
      this.setToken(data.access_token, rememberMe);
    },
    async login(email: string, password: string, rememberMe = false) {
      const api = useApi();
      const data = await api<{ access_token: string }>("/auth/login", {
        method: "POST",
        body: { email, password },
      });
      this.setToken(data.access_token, rememberMe);
    },

    setToken(token: string, rememberMe = false) {
      this.token = token;
      useCookie("token", {
        sameSite: "lax",
        maxAge: rememberMe ? 60 * 60 * 24 * 30 : undefined,
      }).value = token;
    },
    logout() {
      this.token = null;
      useCookie("token").value = null;
      navigateTo("/login");
    },
  },
});
