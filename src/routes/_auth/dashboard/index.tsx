import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard/")({
  component: () => <div>Hello /_auth/dashboard/!</div>,
  beforeLoad(opts) {
    throw redirect({
      to: "/dashboard/$role",
      params: { role: opts.context.role },
    });
  },
});
