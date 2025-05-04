import Link from 'next/link'
import styles from './Footer.module.css'
import ThemeSwitcher from './ThemeSwitcher'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className='container'>
        <Image
          src='/imgs/logos/logo.png'
          alt='The fABBA Show Logo'
          width={200}
          height={200}
        />
        <ThemeSwitcher />
        <Link href='https://a2zeta.com' className={styles.copyright}>
          Copyright © {new Date().getFullYear()} a2zeta
        </Link>
      </div>
    </footer>
  )
}
