import Footer from './Components/Footer'
import Header from './Components/Header'
import './globals.css'
import { Saira } from 'next/font/google'

export const metadata = {
  title: 'Miduteca',
  description: 'Generated by create next app',
}

const font = Saira({
  weight: ['400', '700'],
  subsets: ['latin']
})

export default function RootLayout({ children }) {

  return (    
    <html lang="en">
      <body className={font.className}>       
        <Header />
        {children}
        <Footer />
      </body>       
    </html>
  )
}
