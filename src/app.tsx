import "./globals.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import { DefaultNotFound } from "@/components/common/default-not-found";
import { RouteContext } from "@/routes/__root";
import { useAuthenticationStore } from "@/store/auth";
import { Spin } from "antd";
import { useEffect } from "react";
import { useAbilityContext } from "@/lib/access";

const router = createRouter({
  routeTree,
  notFoundMode: "root",
  defaultNotFoundComponent: DefaultNotFound,
  defaultPendingComponent: Spin,
  context: undefined as unknown as RouteContext,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  const context = useAuthenticationStore(s => s);
  const ability = useAbilityContext();
  useEffect(() => void context.refetchSession(), []);
  const isAuthenticated = context.isAuthenticated && context.isInitialized;

  if (!context.isInitialized) {
    return <Spin />;
  }

  return (
    <RouterProvider
      key={String(`${isAuthenticated}`)}
      context={{ ...context, ability, role: "admin" }}
      router={router}
    />
  );
}
