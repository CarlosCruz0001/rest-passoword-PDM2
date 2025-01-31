import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Define o caminho base correto para o Vercel
  server: {
    historyApiFallback: true // Garante que as rotas sejam tratadas corretamente
  }
});
