import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthenticationStoreValue } from "@/store/auth";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { ConfigProvider } from "antd";
import faIR from "antd/locale/fa_IR";
import { Toaster } from "sonner";

export interface RouteContext extends AuthenticationStoreValue {}

export const Route = createRootRouteWithContext<RouteContext>()({
  component: C,
});

function C() {
  return (
    <div>
      <Toaster />
      <TooltipProvider>
        <ConfigProvider
          locale={faIR}
          direction="rtl"
          theme={{ token: { fontFamily: "Vazirmatn, sans-serif" } }}
        >
          <Outlet />
        </ConfigProvider>
      </TooltipProvider>
    </div>
  );
}
