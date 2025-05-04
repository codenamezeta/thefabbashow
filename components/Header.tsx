// import Image from 'next/image'
import styles from './Header.module.css'
// import Nav from './Nav'

interface HeaderProps {
  backgroundImage?: string | null
  height?: string
  title?: string
  subtitle?: string
  overlay?: boolean
  children?: React.ReactNode
}

export default function Header({
  backgroundImage,
  height = '33vh',
  title,
  subtitle,
  overlay = true,
  children,
}: HeaderProps) {
  const headerStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        height: height,
      }
    : { height: height }

  return (
    <header
      className={`${styles.header} ${backgroundImage ? styles.withImage : ''}`}
      style={headerStyle}
    >
      {overlay && backgroundImage && <div className={styles.overlay} />}

      <div className={styles.content}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {children}
      </div>
    </header>
  )
}
