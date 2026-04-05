import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import os from 'os'
import type { IncomingMessage, ServerResponse } from 'http'

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

// Shared in-memory donations store (persists for the lifetime of the dev/preview server)
interface Donation {
  id: string
  amount: number
  monthly: boolean
  timestamp: string
}
const donations: Donation[] = []

function setupApiMiddlewares(middlewares: { use: (path: string, handler: (req: IncomingMessage, res: ServerResponse, next: () => void) => void) => void }) {
  middlewares.use('/api/local-ip', (_req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ url: `http://${networkIP}:5173` }))
  })

  middlewares.use('/api/donate', (req, res, next) => {
    if (req.method !== 'POST') { next(); return }
    let body = ''
    req.on('data', (chunk: Buffer) => { body += chunk.toString() })
    req.on('end', () => {
      try {
        const data = JSON.parse(body)
        const donation: Donation = {
          id: Math.random().toString(36).slice(2),
          amount: Math.abs(Number(data.amount)) || 0,
          monthly: Boolean(data.monthly),
          timestamp: new Date().toISOString(),
        }
        donations.push(donation)
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ ok: true, donation }))
      } catch {
        res.statusCode = 400
        res.end(JSON.stringify({ ok: false }))
      }
    })
  })

  middlewares.use('/api/donations', (_req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(donations))
  })
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'connext-api',
      configureServer(server) {
        setupApiMiddlewares(server.middlewares)
      },
      configurePreviewServer(server) {
        setupApiMiddlewares(server.middlewares)
      },
    },
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
