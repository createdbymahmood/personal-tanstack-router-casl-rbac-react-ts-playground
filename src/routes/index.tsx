import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => <div>Hello /!</div>,
  beforeLoad({ context }) {
    throw redirect({ to: "/dashboard/$role", params: { role: context.role } });
  },
});
