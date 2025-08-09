// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  site: 'https://FontesHabana.github.io', 
  // Reemplaza <TU_REPOSITORIO> con el nombre de tu repositorio
  base: '/MuMind/',
  integrations: [react()]
});
