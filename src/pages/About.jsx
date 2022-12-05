import FollowUs from '../components/FollowUs'
import big_bear_26 from '../imgs/big-bear/big_bear_26.jpg'
import big_bear_banner from '../imgs/big-bear/big_bear_banner.jpg'
import logo from '../imgs/logo.png'
// import fabba_08 from '../imgs/fabba-08.jpg'
import stage13 from '../imgs/stage/image13.jpeg'
import juliesPhoto from '../imgs/Bio Images/Julie Ruck 2.jpg'
import mcsPhoto from '../imgs/Bio Images/Marie-Claire Marshall.jpg'
import andysPhoto from '../imgs/Bio Images/Andy 1.jpg'
import larsPhoto from '../imgs/Bio Images/Lars 1.jpeg'
import levisPhoto from '../imgs/Bio Images/Levi 1.jpeg'
import kariesPhoto from '../imgs/Bio Images/Karie 1.jpeg'
import michaelsPhoto from '../imgs/Bio Images/Michael Zeta 1.jpg'
import gustavosPhoto from '../imgs/Bio Images/Gustavo 1.jpg'
import Footer from '../components/Footer'
import Nav from '../components/nav/Nav'

const About = () => {
  return (
    <>
      <Nav logo={logo} transparency />
      <main>
        <header>
          <img
            src={big_bear_26}
            alt='The Members of fABBA'
            className='full-width-img show-on-mobile'
          />
          <img
            src={big_bear_banner}
            alt='The Members of fABBA'
            className='full-width-img hide-on-mobile'
          />
          <img src={logo} alt='Logo' id='abba_page_logo_display' />
        </header>
        <div className='container'>
          {/* <!-- <h1 className="center-text">The FABBA Show</h1> --> */}
          <div className='center-text hobo' id='band_bio'>
            <h2 className='center-text'>
              The sensationally authentic tribute to ABBA
            </h2>
            You can dance and jive and have the time of your life! The fABBA
            Show is the world class homage to 70's pop sensation ABBA. Featuring
            a high-energy, full-of-fun, and internationally acclaimed cast that
            will take you on a glittery, sparkling, and truly magical journey
            back to the disco and the 70s. The fABBA Show is famous for their
            flashy stage production, extravagant costumes, exciting
            choreography, and innate ability to drive an audience wild.
            Audiences will dance in the aisles and sing at the top of their
            voices. The fABBA Show doesn't just plan to give you a night out to
            remember, they want to change your lives!
          </div>
        </div>
        {/* <!-- /.container --> */}
        <FollowUs />

        <img
          src={stage13}
          alt='The Members of fABBA'
          className='full-width-img'
          style={{ marginBottom: '-5px' }}
        />
        <h2 id='meet_the_band'>Meet The Group</h2>
        <div className='bios grid'>
          <div className='bio flex' id='julie_bio'>
            <img className='bio-pic' src={juliesPhoto} alt='Julie Ruck' />
            <div className='bio-text'>
              <h3>Julianne Ruck</h3>
              <h5>As Agnetha Fältskog</h5>
              <p>
                Julianne Ruck is a singer, dancer, and actress based in Los
                Angeles. You can see her live as the Queen at Medieval Times
                Dinner and Tournament, Princess Anita at Pirates Dinner
                Adventure, and in multiple stage shows at Knott’s Berry Farm.
                She has also recorded vocals for Elvira Mistress of the Dark
                Live, Knott’s Scary Farm’s Mesmer, the Timber Mountain Log Ride,
                and a favorite Peanuts character. You can keep up with her on
                Instagram at{' '}
                <a
                  style={{ color: '#000', textDecoration: 'none' }}
                  href='https://www.instagram.com/julianneruck'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  @JulianneRuck
                </a>
              </p>
            </div>
          </div>
          <div className='bio flex' id='mc'>
            <img
              className='bio-pic'
              src={mcsPhoto}
              alt='Marie-Claire Marshall'
            />
            <div className='bio-text'>
              <h3>Marie-Claire Marshall</h3>
              <h5>As Anni-Frid Lyngstad</h5>
              <p>
                Marie-Claire's credits include Juliet in Romeo and Juliet, Joan
                in Joan of Arc, and Katerina in the Taming of the Shrew for the
                English National Heritage Theater, Marla in Twists of Fate for
                the Weather Channel and roles in Jane the Virgin and Grace and
                Frankie. She has toured with The FABBA Show in Europe, Africa,
                and Asia.
              </p>
            </div>
          </div>
          <div className='bio flex' id='lars_bio'>
            <img className='bio-pic' src={larsPhoto} alt='Lars Midthun' />
            <div className='bio-text'>
              <h3>Lars Midthun</h3>
              <h5>As Benny Andersson</h5>
              <p>
                Hailing from Scandinavia via Minnesota, Lars is living in Los
                Angeles pursuing the Art of LOLs and Giggles,( and if he’s
                honest Frisbee Golf). He is actively traveling his road to fame
                and fortune in LA appearing in plays, shows, and films. He
                recently played Kevin Bacon’s role in Footloose in the theater
                in Hollywood. As well as being a singer, an actor and a dancer,
                he is a stand up comedian and he produces an abundance of his
                own comedy projects ( does he really have time for Frisbee
                Golf)? He is SO excited to be touring the US playing Benny in
                The FABBA Show! You can find his online presence and sketch
                comedy just by searching: 'Lars on Mars'!
              </p>
            </div>
          </div>
          <div className='bio flex' id='andy_bio'>
            <img className='bio-pic' src={andysPhoto} alt='Andy Marshall' />
            <div className='bio-text'>
              <h3>Andy Marshall</h3>
              <h5>As Björn Ulvaeus</h5>
              <p>
                Andy writes, produces, engineers, and plays guitar. He's written
                songs for Sonambu's touring show in Europe, engineered for Ken
                Follett's Blues band, and played guitar for almost every pop act
                to come out of the U.K.
              </p>
            </div>
          </div>
          <div className='bio flex' id='gustavo_bio'>
            <img className='bio-pic' src={gustavosPhoto} alt='Gustavo Peraza' />
            <div className='bio-text'>
              <h3>Gustavo Peraza</h3>
              <h5>As Ola Brunkert</h5>
              <p>
                Gustavo is influenced by the classics from Elvis through
                alternative, fusion, jazz, and pop, and with years of recording,
                touring, and performing experience, he has found a new family
                playing with The FABBA Show. Remaining faithful to the original
                songs and adding that extra live excitement, he energizes the
                band and gets the audience out of their seats!
              </p>
            </div>
          </div>
          <div className='bio flex' id='levi_bio'>
            <img className='bio-pic' src={levisPhoto} alt='Levi Petree' />
            <div className='bio-text'>
              <h3>Levi Petree</h3>
              <h5>Alternate</h5>
              <p>
                Levi Petree is an actor and songwriter who has performed on
                stages all across the U.S. Favorite credits include ‘The
                Incredibly Famous Willy Rivers’ (SiNNERMAN Ensemble - Chicago)
                ‘Afterloves’ (Bard’s Theatre - Louisville) and ‘The Foreigner’
                (Lagniappe Theatre - Louisiana). He was recently seen as Cpt.
                William Clark on INSP’s ‘Into the Wild Frontier’ and was the
                voice of the diabolical arsonist on the award-nominated podcast
                ‘Firebug’. His music can be found on all streaming platforms.
              </p>
            </div>
          </div>
          <div className='bio flex' id='levi_bio'>
            <img className='bio-pic' src={kariesPhoto} alt='Karie Seasock' />
            <div className='bio-text'>
              <h3>Karie Seasock</h3>
              <h5>Alternate</h5>
              <p>
                Karie is thrilled to be portraying Agnetha in The ABBA Show! She
                is a regular guest star in the phenomenal musical theater shows
                at Disneyland Resort and Knott's Berry Farm in California and
                she appears in Disney Channel’s ‘Suite Life on Deck’. Karie
                starred in the famous Radio City Christmas Spectacular for 6
                years and loved every second of it. When not performing, she
                teaches dance and choreographs for California show choirs. Karie
                holds a BA in Drama from the University of California, Irvine.
                Now, GIMMIE! GIMMIE! GIMMIE! some ABBA!
              </p>
            </div>
          </div>
          <div className='bio flex' id='michael_bio'>
            <img className='bio-pic' src={michaelsPhoto} alt='Michael Zeta' />
            <div className='bio-text'>
              <h3>Michael Zeta</h3>
              <h5>Alternate</h5>
              <p>
                Michael is a multi-instrumentalist and has been performing since
                the age of 12. When he's not disco dancing with The FABBA Show,
                he can be found in the studio recording with his original band,{' '}
                <a
                  style={{ color: '#000', textDecoration: 'none' }}
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://thesecondmessenger.com'
                >
                  The Second Messenger
                </a>{' '}
                or teaching the next generation of musicians at Rockstars of
                Tomorrow how to rock the stage.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default About
