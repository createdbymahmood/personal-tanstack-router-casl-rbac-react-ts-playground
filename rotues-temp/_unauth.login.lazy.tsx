import { LoginForm } from "@/components/auth/login-form";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_unauth/login")({
  component: LoginForm,
  notFoundComponent: () => <div>NOT FOUND</div>,
  pendingComponent: () => <div>Pending...</div>,
  errorComponent: () => <div>ERR...</div>,
});
