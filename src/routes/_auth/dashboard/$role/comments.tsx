import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard/$role/comments/")({
  component: () => <div>Hello /_auth/dashboard/$role/comments/!</div>,
  beforeLoad(opts) {
    if (!opts.context.ability.can("read", "Comment")) {
      throw redirect({ to: "/dashboard" });
    }
  },
});
