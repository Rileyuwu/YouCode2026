import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import os from 'os'

function getNetworkIP(): string {
  const interfaces = os.networkInterfaces()
  for (const iface of Object.values(interfaces)) {
    for (const addr of iface ?? []) {
      if (addr.family === 'IPv4' && !addr.internal) return addr.address
    }
  }
  return 'localhost'
}

const networkIP = getNetworkIP()

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'local-ip',
      configureServer(server) {
        server.middlewares.use('/api/local-ip', (_req, res) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ url: `http://${networkIP}:5173` }))
        })
      },
    },
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
