import { createRoot } from "react-dom/client";

import App from "./App.tsx";

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return;
  }
  const { worker } = await import("./shared/mocks/browser.ts");

  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
