import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const base = command === 'serve' ? '/' : '/prakt-dashboard-react/';

  return {
    plugins: [react()],
    base: base, 
  };
});