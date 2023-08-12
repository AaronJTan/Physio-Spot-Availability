import Navbar from '@/components/navbar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'The Physio Spot Available Appointments',
  description: 'View Physiotherapist Available Appointments',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header>
            <Navbar />
          </header>

          <main className="flex-1">{children}</main>

        </div>
      </body>
    </html>
  )
}
