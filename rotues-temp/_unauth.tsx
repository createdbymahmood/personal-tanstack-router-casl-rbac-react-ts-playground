import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_unauth")({
  component: () => <Outlet />,
  beforeLoad({ context: { isAuthenticated } }) {
    if (isAuthenticated) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  notFoundComponent: () => <div>NOT FOUND</div>,
  pendingComponent: () => <div>Pending...</div>,
  errorComponent: () => <div>ERR...</div>,
});
