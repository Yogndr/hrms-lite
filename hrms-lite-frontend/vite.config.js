import { defineConfig } from 'vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'devserver-main--hrms-frontend-yogender.netlify.app',
    ],
  },
});
