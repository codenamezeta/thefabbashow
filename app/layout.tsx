import type { Metadata } from 'next'
import { Roboto, Noto_Sans } from 'next/font/google'
import './globals.css'
import Nav, { NavItem } from '../components/Nav'
import Footer from '@/components/Footer'

const roboto = Roboto({
  variable: '--font-body',
  subsets: ['latin'],
})

const notoSans = Noto_Sans({
  variable: '--font-heading',
  subsets: ['latin'],
})

//- MC Didn't look the rounded look of Concert One. It's "too fun"
// const concertOne = Concert_One({
//   variable: '--font-heading',
//   weight: '400',
//   subsets: ['latin'],
// })

export const metadata: Metadata = {
  title: 'The fABBA Show',
  authors: [{ name: 'a2zeta' }],
  creator: 'a2zeta',
  description: 'An a2zeta Project',
}

//* Define the logo and navigation items
const logo = {
  src: '/imgs/logos/logo.png',
  alt: 'The fABBA Show Logo',
  width: 800,
  height: 800,
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Posts', href: '/posts' },
  { label: 'Events', href: '/events' },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${roboto.variable} ${notoSans.variable}`}>
        <Nav items={navItems} logo={logo} sticky />
        {children}

        <Footer />
      </body>
    </html>
  )
}
