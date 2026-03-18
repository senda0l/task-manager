const authRoutes = new Set(["/login", "/register", "/forgot-password"]);

export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie<string | null>("token");
  const isAuthenticated = Boolean(token.value);
  const isAuthRoute = authRoutes.has(to.path);

  if (!isAuthenticated && !isAuthRoute) {
    return navigateTo({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  }

  if (isAuthenticated && isAuthRoute) {
    const redirectTarget =
      typeof to.query.redirect === "string" && to.query.redirect.startsWith("/")
        ? to.query.redirect
        : "/";

    return navigateTo(redirectTarget);
  }
});