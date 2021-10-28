import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'
import './FollowUs.css'

const FollowUs = () => {
  return (
    <div className="follow-us-banner">
      <h2>Follow The FABBA Show</h2>
      <div className="icons-wrapper">
        <a
          href="https://facebook.com/theFABBAshow"
          className="social-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook size="5em" color="white" />
          <span className="link-name">Facebook</span>
          <span className="handle">@thefabbashow</span>
        </a>
        <a
          href="https://www.instagram.com/thefabbashow/"
          className="social-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size="5em" color="white" />
          <span className="link-name">Instagram</span>
          <span className="handle">@thefabbashow</span>
        </a>
        <a
          href="https://www.twitter.com/thefabbashow/"
          className="social-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter size="5em" color="white" />
          <span className="link-name">Twitter</span>
          <span className="handle">@thefabbashow</span>
        </a>
        <a
          href="https://www.youtube.com/channel/UCNDXZGcI28PSC-Mft7Es3Vw"
          className="social-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube size="5em" color="white" />
          <span className="link-name">YouTube</span>
          <span className="handle">@thefabbashow</span>
        </a>
      </div>
    </div>
  )
}

export default FollowUs
