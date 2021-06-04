import React, { useState } from 'react'
import './Nav.css'
import { FaTimes, FaBars } from 'react-icons/fa'
// import Link from 'react-router-dom'
//TODO: Auto focus when nav state is toggled.
//? Maybe try: document.getElementById("nav_open_item").focus()

const Nav = ({ logo, siteTitle, transparency }) => {
  Nav.defaultProps = {
    transparency: false,
    siteTitle: 'Site Title',
  }

  const [navOpen, setNavOpen] = useState(false)
  const [transparent, setTransparent] = useState(transparency)

  let sideSheetClasses = 'closed',
    clickBlockerClass = 'off',
    docBody = document.body
  docBody.style.overflow = 'visible'
  if (navOpen) {
    sideSheetClasses = 'open'
    clickBlockerClass = 'on'
    docBody.style.overflow = 'hidden'
  }

  const colorNav = () => {
    if (window.scrollY <= 50 && transparency === true) {
      setTransparent(true)
    } else {
      setTransparent(false)
    }
  }

  window.addEventListener('scroll', colorNav)

  // const transparencyStyles = {
  //   backgroundColor: 'transparent',
  //   position: 'absolute',
  //   top: '0px',
  //   width: '100%',
  //   // borderBottom: '1px solid #eeeeee22',
  //   // boxShadow: '0px 2px 10px #88888888',
  //   textShadow: '1px 1px 1px #000',
  //   backdropFilter: 'blur(2px)',
  //   backgroundImage: 'none',
  // }

  // const navbar = document.getElementById(navbar)
  // // if (document.body.scrollTop > 25 || document.documentElement.scrollTop > 25) {
  // //   navbar.classList.add('nav-color')
  // // } else {
  // //   navbar.classList.remove('nav-color')
  // // }

  // console.log(navbar)

  return (
    <>
      {/* <nav id="navbar" style={transparent ? transparencyStyles : null}> */}
      <nav id="navbar" className={transparent ? 'transparent-navbar' : null}>
        <ul>
          <li id="navbar_brand">
            <a href="/" className="site-name nav-item" id="site-name">
              {logo ? <img src={logo} alt="logo" /> : { siteTitle }}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/about">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/events">
              Events
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/booking">
              Booking
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="https://www.paypal.com/donate?business=R96WVXL2HA5TG&item_name=Thank+you%21+We+split+our+tips+between+all+6+fabulous+musicians%2C+Marie-Claire%2C+Julianne%2C+Andy%2C+Robert%2C+Michael+and+Gustavo.&currency_code=USD"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tips
            </a>
          </li>
          {/* <li className="nav-item">
            <form
              action="https://www.paypal.com/donate"
              method="post"
              target="_top"
            >
              <input type="hidden" name="business" value="R96WVXL2HA5TG" />
              <input
                type="hidden"
                name="item_name"
                value="Thank you! We split our tips between all 6 fabulous musicians, Marie-Claire, Julianne, Andy, Robert, Michael and Gustavo."
              />
              <input type="hidden" name="currency_code" value="USD" />
              <input
                type="image"
                src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
                border="0"
                name="submit"
                title="PayPal - The safer, easier way to pay online!"
                alt="Donate with PayPal button"
              />
              <img
                alt=""
                border="0"
                src="https://www.paypal.com/en_US/i/scr/pixel.gif"
                width="1"
                height="1"
              />
            </form>
          </li> */}
          <li id="nav_open_item" onClick={() => setNavOpen(true)}>
            {/* <Icon name='bars' size='big' /> */}
            <FaBars size="2em" />
          </li>
        </ul>
      </nav>

      <div
        id="click_blocker"
        className={clickBlockerClass}
        onClick={() => setNavOpen(false)}
      ></div>
      {/* <!-- Mobile Navigation --> */}
      <nav id="side_sheet" className={sideSheetClasses}>
        <ul>
          <li
            id="nav_close_item"
            className="nav-item"
            onClick={() => setNavOpen(false)}
          >
            {/* <Icon name='close' size='big' /> */}
            <FaTimes size="1.5em" style={{ marginLeft: 'auto' }} />
          </li>
          <li className="nav-item">
            <a id="side_nav_brand" className="" href="/">
              {logo ? <img src={logo} alt="logo" /> : { siteTitle }}
            </a>
          </li>
          <li className="nav-item">
            <a href="/" className="side-nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/about" className="side-nav-link">
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="/events" className="side-nav-link">
              Events
            </a>
          </li>
          <li className="nav-item">
            <a href="/booking" className="side-nav-link">
              Booking
            </a>
          </li>
          <li id="paypal_button" className="nav-item">
            <form
              action="https://www.paypal.com/donate"
              method="post"
              target="_top"
            >
              <input type="hidden" name="business" value="R96WVXL2HA5TG" />
              <input
                type="hidden"
                name="item_name"
                value="Thank you! We split our tips between all 6 fabulous musicians, Marie-Claire, Julianne, Andy, Robert, Michael and Gustavo."
              />
              <input type="hidden" name="currency_code" value="USD" />
              <input
                type="image"
                src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
                border="0"
                name="submit"
                title="PayPal - The safer, easier way to pay online!"
                alt="Donate with PayPal button"
              />
              <img
                alt=""
                border="0"
                src="https://www.paypal.com/en_US/i/scr/pixel.gif"
                width="1"
                height="1"
              />
            </form>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Nav
