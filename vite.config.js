import { defineConfig } from 'vite'

export default defineConfig({
  root: '..',
  base: '/React-First-Project-BookHub/',
  publicDir: 'bookhub/public',
  build: {
    outDir: 'bookhub/dist',
  },
})
