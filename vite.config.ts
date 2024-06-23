import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import path from "path";
import { includes, some } from "lodash-es";
const vendors = ["react", "react-dom", "antd"];

const getManualChunks = (id: string) => {
  if (!id.includes("node_modules")) return;
  const isVendor = some(vendors, vendor => includes(id, vendor));
  if (isVendor) return "vendors";

  // return id.toString().split("node_modules/")[1].split("/")[0].toString();
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: getManualChunks,
      },
    },
  },
});
