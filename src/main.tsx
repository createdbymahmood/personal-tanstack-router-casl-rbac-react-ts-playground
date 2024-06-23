import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import { Spin } from "antd";
import { AccessProvider } from "@/lib/access";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<Spin />}>
      <AccessProvider>
        <App />
      </AccessProvider>
    </Suspense>
  </React.StrictMode>
);
