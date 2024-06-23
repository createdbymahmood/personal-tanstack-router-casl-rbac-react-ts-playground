import { AbilityContextValue } from "@/lib/access";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

export interface RouteContext {
  role: "admin" | "associate";
  ability: AbilityContextValue;
}

export const Route = createRootRouteWithContext<RouteContext>()({
  component: () => <Outlet />,
});
