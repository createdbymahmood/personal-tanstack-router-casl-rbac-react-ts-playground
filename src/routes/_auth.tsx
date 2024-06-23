import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: () => {
    return <Outlet />;
  },
  beforeLoad() {
    return { role: "admin" };
  },
});
