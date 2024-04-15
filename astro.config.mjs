import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import db from "@astrojs/db";
import node from "@astrojs/node";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), db(), icon()],
  output: "hybrid",
  adapter: node({
    mode: "standalone"
  })
});