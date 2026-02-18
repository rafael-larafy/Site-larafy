import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LaraFy - Reduzimos Impostos com Precisao Cirurgica',
  description: 'A decisao tributaria que seu negocio precisa, com resultados e ZERO riscos. Decisoes sustentadas por tecnologia exclusiva e execucao orientada a exito financeiro.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a1628',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body className="font-sans antialiased bg-[#0a1628] text-[#ffffff]">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
