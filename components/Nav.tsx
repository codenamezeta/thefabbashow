'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FaBars, FaTimes, FaChevronRight } from 'react-icons/fa'
import styles from './Nav.module.css'

// Updated types for multi-level navigation
export interface NavItem {
  label: string
  href: string
  subItems?: NavItem[]
}

interface NavProps {
  items: NavItem[]
  logo?: {
    src: string
    alt: string
    width: number
    height: number
  }
  sticky?: boolean
  transparentOnTop?: boolean
}

export default function Nav({
  items,
  logo,
  sticky = false,
  transparentOnTop = false,
}: NavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)
  const [openMobileDropdowns, setOpenMobileDropdowns] = useState<string[]>([])
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  // Handle scroll events for transparency
  useEffect(() => {
    if (transparentOnTop) {
      const handleScroll = () => {
        setIsAtTop(window.scrollY < 10)
      }

      window.addEventListener('scroll', handleScroll)
      handleScroll() // Check initial position

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [transparentOnTop])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    // Close mobile menu on window resize to desktop size
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const toggleMenu = () => setIsOpen(!isOpen)

  const toggleMobileDropdown = (path: string) => {
    setOpenMobileDropdowns((prev) => {
      const isOpen = prev.includes(path)
      return isOpen
        ? prev.filter((item) => item !== path && !item.startsWith(`${path}/`))
        : [...prev, path]
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent, path: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleMobileDropdown(path)
    }
  }

  const isDropdownOpen = (path: string) => {
    return openMobileDropdowns.includes(path)
  }

  const navClasses = [
    styles.nav,
    sticky ? styles.sticky : '',
    transparentOnTop && isAtTop ? styles.transparent : '',
    !isAtTop ? styles.scrolled : '',
    isOpen ? styles.mobileOpen : '',
  ]
    .filter(Boolean)
    .join(' ')

  // Helper function to check if a path is active or contains the current path
  const isActive = (item: NavItem) => {
    if (pathname === item.href) return true

    // Recursive helper function to check sub-items
    const checkSubItems = (subItems?: NavItem[]): boolean => {
      if (!subItems) return false

      for (const subItem of subItems) {
        if (pathname === subItem.href) return true // Direct match
        if (subItem.href !== '/' && pathname.startsWith(`${subItem.href}/`))
          return true // Prefix match
        if (subItem.subItems && checkSubItems(subItem.subItems)) return true // Recursive check
      }
      return false
    }

    // Check if the current path starts with the item's href followed by a slash
    if (item.href !== '/' && pathname.startsWith(`${item.href}/`)) return true

    return checkSubItems(item.subItems)
  }

  // Recursive function to render desktop dropdown items
  const renderDesktopDropdownItems = (
    items: NavItem[],
    level: number = 0,
    parentPath: string = ''
  ) => {
    return (
      <ul
        className={`${styles.dropdown} ${
          level > 0 ? styles.nestedDropdown : ''
        }`}
        role='menu'
        aria-label={level > 0 ? `${parentPath} submenu` : undefined}
      >
        {items.map((item) => {
          const itemPath = parentPath
            ? `${parentPath}/${item.label}`
            : item.label
          return (
            <li key={item.href} role='none'>
              {item.subItems ? (
                <div className={styles.nestedDropdownContainer}>
                  <Link
                    href={item.href}
                    className={`${styles.dropdownLink} ${
                      isActive(item) ? styles.active : ''
                    }`}
                    role='menuitem'
                    aria-haspopup={!!item.subItems}
                  >
                    {item.label}
                    {item.subItems && (
                      <FaChevronRight
                        className={styles.nestedDropdownArrow}
                        aria-hidden='true'
                      />
                    )}
                  </Link>
                  {item.subItems &&
                    renderDesktopDropdownItems(
                      item.subItems,
                      level + 1,
                      itemPath
                    )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`${styles.dropdownLink} ${
                    isActive(item) ? styles.active : ''
                  }`}
                  role='menuitem'
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  // Recursive function to render mobile dropdown items
  const renderMobileItems = (
    items: NavItem[],
    level: number = 0,
    parentPath: string = ''
  ) => {
    return items.map((item) => {
      const itemPath = parentPath ? `${parentPath}/${item.label}` : item.label
      const isItemOpen = isDropdownOpen(itemPath)

      return (
        <li
          key={item.href}
          className={`${styles.mobileNavItem} ${
            level > 0 ? styles.nestedMobileItem : ''
          }`}
          role='none'
        >
          {item.subItems ? (
            <>
              <div className={styles.mobileNavRow}>
                <Link
                  href={item.href}
                  className={`${styles.mobileNavLink} ${
                    isActive(item) ? styles.active : ''
                  } ${level > 0 ? styles.nestedMobileLink : ''}`}
                  onClick={() => setIsOpen(false)}
                  role='menuitem'
                >
                  {item.label}
                </Link>
                <button
                  onClick={() => toggleMobileDropdown(itemPath)}
                  onKeyDown={(e) => handleKeyDown(e, itemPath)}
                  className={styles.mobileDropdownToggle}
                  aria-expanded={isItemOpen}
                  aria-label={`Toggle ${item.label} submenu`}
                >
                  <span className={styles.dropdownArrow} aria-hidden='true'>
                    {isItemOpen ? '▲' : '▼'}
                  </span>
                </button>
              </div>
              {isItemOpen && item.subItems && (
                <ul
                  className={styles.mobileDropdown}
                  role='menu'
                  aria-label={`${item.label} submenu`}
                >
                  {renderMobileItems(item.subItems, level + 1, itemPath)}
                </ul>
              )}
            </>
          ) : (
            <Link
              href={item.href}
              className={`${styles.mobileNavLink} ${
                isActive(item) ? styles.active : ''
              } ${level > 0 ? styles.nestedMobileLink : ''}`}
              onClick={() => setIsOpen(false)}
              role='menuitem'
            >
              {item.label}
            </Link>
          )}
        </li>
      )
    })
  }

  return (
    <nav
      id='main_navbar'
      className={`${navClasses} ${
        sticky && !transparentOnTop ? 'body-padding-top' : ''
      } ${'blue-gradient'}`}
      ref={navRef}
      aria-label='Main navigation'
    >
      <div className={`${styles.navContainer} container`}>
        {/* Logo */}
        {logo && (
          <Link href='/' className={styles.logoLink}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className={styles.logo}
              priority
            />
          </Link>
        )}

        {/* Desktop Navigation */}
        <ul className={styles.navItems} role='menubar'>
          {items.map((item) => (
            <li
              key={item.label}
              className={`${styles.navItem} ${
                item.subItems ? styles.hasDropdown : ''
              }`}
              role='none'
            >
              {item.subItems ? (
                <>
                  <button
                    className={`${styles.navLink} ${
                      isActive(item) ? styles.active : ''
                    }`}
                    aria-expanded={false}
                    aria-haspopup='true'
                    role='menuitem'
                  >
                    {item.label}
                    <span className={styles.dropdownArrow} aria-hidden='true'>
                      ▼
                    </span>
                  </button>
                  {renderDesktopDropdownItems(item.subItems, 0, item.label)}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${
                    isActive(item) ? styles.active : ''
                  }`}
                  role='menuitem'
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Navigation Toggle */}
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls='mobile-menu'
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? (
            <FaTimes aria-hidden='true' />
          ) : (
            <FaBars aria-hidden='true' />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        id='mobile-menu'
        className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}
        aria-hidden={!isOpen}
      >
        <ul className={styles.mobileNavItems} role='menu'>
          {renderMobileItems(items)}
        </ul>
      </div>
    </nav>
  )
}
