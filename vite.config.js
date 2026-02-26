import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Zmień 'nazwa-repo' na dokładną nazwę swojego repozytorium na GitHubie
  base: '/awa/',
})