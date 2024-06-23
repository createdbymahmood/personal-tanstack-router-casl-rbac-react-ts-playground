import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/dashboard/overview")({
  component: () => <div>Hello /_auth/dashboard/overview!</div>,
  notFoundComponent: () => <div>NOT FOUND</div>,
  pendingComponent: () => <div>Pending...</div>,
  errorComponent: () => <div>ERR...</div>,
});
