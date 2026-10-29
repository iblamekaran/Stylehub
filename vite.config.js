import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(projectRoot, "index.html"),
        about: resolve(projectRoot, "about.html"),
        account: resolve(projectRoot, "account.html"),
        checkout: resolve(projectRoot, "checkout.html"),
      },
    },
  },
});
