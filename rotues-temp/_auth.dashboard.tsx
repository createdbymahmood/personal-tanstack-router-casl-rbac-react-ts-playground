import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard")({
  component: () => (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ),
  notFoundComponent: () => <div>NOT FOUND ASD</div>,
  pendingComponent: () => <div>Pending...</div>,
  errorComponent: e => {
    console.log(e);
    return <div>ERR...</div>;
  },
});
