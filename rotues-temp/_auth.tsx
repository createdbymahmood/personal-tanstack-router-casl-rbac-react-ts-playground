import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const isAuthenticated = true;

export const Route = createFileRoute("/_auth")({
  component: () => <Outlet />,

  beforeLoad({ context: { isAuthenticated }, location }) {
    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }
  },
  notFoundComponent: () => <div>NOT FOUND</div>,
  pendingComponent: () => <div>Pending...</div>,
  errorComponent: () => <div>ERR...</div>,
});
