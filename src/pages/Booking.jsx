import FollowUs from '../components/FollowUs'
import banner2 from '../imgs/fabba-banner-02.jpg'
import banner1 from '../imgs/fabba-banner-01.jpg'
// import tourinfo from '../imgs/tourinfo.jpg'
// import optionA from '../imgs/optionA.jpg'
// import optionB from '../imgs/optionB.jpg'
import Footer from '../components/Footer'
import Nav from '../components/nav/Nav'
import logo from '../imgs/logo-01.png'

const Booking = () => {
  return (
    <>
      <Nav logo={logo} transparency />
      <img src={banner2} className="full-width-img" alt="fabba-banner-02" />
      <h5 className="center-text" id="now_booking">
        NOW BOOKING
      </h5>
      <section className="virtual-tour-info container">
        <h2 className="span-all-cols">The ABBA–Solutely Virtual Tour!</h2>
        <h3 className="span-all-cols">
          Drive new profit and sponsor support to your venue with no risk and no
          cap.
        </h3>
        <p className="span-all-cols">
          Virtual events will be the most profitable avenue for venues in 2021,
          and our purpose-built model empowers you to attract sponsors. The
          fABBA Show, one of the most successful touring tribute productions
          over the past decade, is offering a zero-risk opportunity for your
          venue to deliver two high-quality, interactive shows to patrons with
          unlimited capacity!
        </p>
        <div className="option">
          <h4>Option A</h4>
          <p>
            You sell tickets, and you stream our show from your website, and we
            deliver an encoded, pre-recorded "broadcast as live" show to your
            webmaster.
          </p>
          <ul>
            <li>50% / 50% ticket revenue split from dollar one.</li>
            <li>
              Opportunities for sponsored videos or static commercials during
              the show.
            </li>
            <li>
              Optional pre-show with your sponsor branding, sponsor commercials,
              stage speech, and upcoming shows that we will help produce with
              you.
            </li>
            <li>
              Preview and troubleshoot the production and pre-show before the
              live stream date.
            </li>
          </ul>
          <a
            href="https://files.constantcontact.com/262626d6401/5fcb2657-ce18-4cc3-916e-35f9350c829b.pdf"
            className="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </div>
        <div className="option">
          <h4>Option B</h4>
          <p>
            Stellar Tickets will sell tickets and stream show at a 42.55% /
            42.55% / 14.9% (Stellar Tickets) ticket revenue split after $500.
          </p>
          <ul>
            <li>Live stream ticketing and seamless 4K streaming.</li>
            <li>
              Opportunities for sponsored videos or static commercials during
              the show.
            </li>
            <li>
              One hundred comp tickets for your sponsors or media trade
              partners.
            </li>
            <li>
              Marketing platform with unlimited tracking links and marketing
              pixels.
            </li>
            <li>Optional marketing by Goldstar at no additional cost.</li>
            <li>
              Interactive chat and reaction emojis, which you can monitor and
              interact with during the show.
            </li>
            <li>Access to all ticket buyer data.</li>
            <li>Gamified and customizable donation/merch tabs and pop-ups.</li>
            <li>
              Ticket patrons can watch on computer, phone, tablet, and OTT apps
              such as Apple TV, Fire TV, and Roku.
            </li>
            <li>Customer technical support service for ticket buyers.</li>
            <li>
              Preview and troubleshoot production and pre-show before the live
              stream date.
            </li>
          </ul>
          <a
            href="https://files.constantcontact.com/262626d6401/35c297a9-9f7f-4deb-bd78-00aa94b04b45.pdf"
            className="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </div>
      </section>
      <FollowUs />
      <main className="center-text" id="contact_section">
        <div className="container" id="contact_info">
          <h1>Contact The FABBA Show</h1>
          <h3>The sensationally authentic tribute to ABBA.</h3>
          <p className="contact">
            <a href="mailto:info@thefabbashow.com">
              For booking, tour info, and more, contact info@thefabbashow.com
            </a>
          </p>
        </div>
        <img src={banner1} className="full-width-img" alt="fabba-banner-01" />
      </main>
      <Footer />
    </>
  )
}

export default Booking
