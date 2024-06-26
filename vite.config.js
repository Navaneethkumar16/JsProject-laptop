import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

//  for cors issue
server: {
  proxy: {
      '/LaptopAPI': {
          target: 'http://localhost:8081',
          changeOrigin: true,
          secure: false,
         // rewrite: (path) => path.replace(/^\/LaptopAPI/, '')
      }
  }
}


})
