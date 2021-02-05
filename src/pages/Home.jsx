import Video from '../vids/promo.mp4'
import Nav from '../components/nav/Nav'
import logo from '../imgs/logo-01.png'

const Home = ({ promoVid }) => {
  return (
    <>
      <Nav logo={logo} transparency />
      <main id="fullscreen_section">
        <video
          autoPlay
          muted
          loop
          controls
          poster="../imgs/fabba-03.jpg"
          className="fullscreen-bg-video"
          id="frontpage_video"
          src={promoVid}
          type="video/mp4"
        >
          <source src={Video} />
        </video>
        <div className="over-video">
          <div className="text-overlay">
            <p>
              The FABBA Show is America's most renowned, authentic, and truly
              sensational tribute to Abba. The legend lives on, with hit after
              hit of dance floor classics like Dancing Queen, Super Trouper,
              Mamma Mia, and over 40 other hit singles that will have on your
              feet disco-dancing all night. The costumes are spectacular, and
              the energy and showmanship brought by the nationally-acclaimed
              cast, keeps fans coming back again and again.
            </p>
          </div>
          <div className="btn-group">
            <a href="/about" className="button button-outline">
              Learn More
            </a>
            <a href="/events" className="button button-outline">
              Tickets
            </a>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
