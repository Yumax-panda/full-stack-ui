import { CssBaseline } from '@mui/material'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Profile from './_components/Profile'
import { Container } from '@/app/_components/Container/Container'
import 'ress'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Full Stack',
  description: 'A portfolio site for engineers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ja'>
      <body className={inter.className} style={{ color: '#696f73' }}>
        <CssBaseline />
        <Profile />
        <Container>{children}</Container>
      </body>
    </html>
  )
}