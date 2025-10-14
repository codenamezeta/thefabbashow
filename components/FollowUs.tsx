import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'
import styles from './FollowUs.module.css'
import Link from 'next/link'

export default function FollowUs() {
  return (
    <section className={`${styles.followUs}`}>
      <h2>Follow Us</h2>
      <span>@theFABBAshow</span>
      <ul>
        <li>
          <Link
            href='https://www.facebook.com/theFABBAshow'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaFacebook />
          </Link>
        </li>
        <li>
          <Link
            href='https://www.instagram.com/thefabbashow/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaInstagram />
          </Link>
        </li>
        <li>
          <Link
            href='https://www.tiktok.com/@fabbashow'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaTiktok />
          </Link>
        </li>
        <li>
          <Link
            href='https://www.youtube.com/@thefabbashow'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaYoutube />
          </Link>
        </li>
      </ul>
    </section>
  )
}
