//! Use this shitty version if they complain about the good version.

import FollowUs from '../components/FollowUs'
import banner2 from '../imgs/fabba-banner-02.jpg'
import banner1 from '../imgs/fabba-banner-01.jpg'
import tourinfo from '../imgs/tourinfo.jpg'
import optionA from '../imgs/optionA.jpg'
import optionB from '../imgs/optionB.jpg'
import Footer from '../components/Footer'
import Nav from '../components/nav/Nav'
import logo from '../imgs/logo-01.png'

const Booking = () => {
  return (
    <>
      <Nav logo={logo} transparent />
      <main className="center-text" id="contact_info">
        <img src={banner2} className="full-width-img" alt="fabba-banner-02" />
        <h1>Contact The FABBA Show</h1>
        <h3>The sensationally authentic tribute to ABBA.</h3>
        <p className="contact">
          <a href="mailto:info@thefabbashow.com">
            For booking, tour info, and more, contact info@thefabbashow.com
          </a>
        </p>
        <div className="container flex" style={{ flexDirection: 'column' }}>
          <img src={tourinfo} className="full-width-img" alt="Tour Info" />
          <div className="options flex">
            <a
              href="https://files.constantcontact.com/262626d6401/5fcb2657-ce18-4cc3-916e-35f9350c829b.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={optionA} alt="Option A" />
            </a>
            <a
              href="https://files.constantcontact.com/262626d6401/35c297a9-9f7f-4deb-bd78-00aa94b04b45.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={optionB} alt="Option B" />
            </a>
          </div>
        </div>
        <FollowUs />
        <img src={banner1} className="full-width-img" alt="fabba-banner-01" />
      </main>
      <Footer />
    </>
  )
}

export default Booking
