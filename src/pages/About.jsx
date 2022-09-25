import FollowUs from '../components/FollowUs'
import big_bear_26 from '../imgs/big-bear/big_bear_26.jpg'
import big_bear_banner from '../imgs/big-bear/big_bear_banner.jpg'
import logo from '../imgs/logo-01.png'
import fabba_08 from '../imgs/fabba-08.jpg'
import juliesPhoto from '../imgs/Bio Images/Julie Ruck 2.jpg'
import mcsPhoto from '../imgs/Bio Images/Marie-Claire Marshall.jpg'
import andysPhoto from '../imgs/Bio Images/Andy 1.jpg'
import larsPhoto from '../imgs/Bio Images/Lars 1.jpeg'
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
              The sensationally authentic tribute to ABBA.
            </h2>
            Direct from the U.K. and back by popular demand, The FABBA Show is
            now America's most renowned, authentic, and truly sensational
            tribute to ABBA. "The World's top ABBA tribute show," said the
            London Times and "Even better than the originals live," claimed the
            Houston Chronicle. The setlist is packed with all your favorite
            hits, and the costumes are simply spectacular. The energy and
            showmanship brought by this superb cast has fans from all over the
            world returning time after time for more of The FABBA Show.
          </div>
        </div>
        {/* <!-- /.container --> */}
        <img
          src={fabba_08}
          alt='The Members of fABBA'
          className='full-width-img'
          style={{ marginBottom: '-5px' }}
        />
        <FollowUs />
        <h2 id='meet_the_band'>Meet The Band</h2>
        <div className='bios grid'>
          <div className='bio flex' id='julie_bio'>
            <img className='bio-pic' src={juliesPhoto} alt='Julie Ruck' />
            <div className='bio-text'>
              <h3>Julianne Ruck</h3>
              <h5>As Agnetha Fältskog</h5>
              <p>
                Julianne is a lead singer and actress in all of Knott’s Berry
                Farm’s big musical shows. She can be found on the Snoopy Stage,
                in the Cowboy Saloon and is the famous Ghostly Beauty in their
                Halloween Spooktacular. She plays the Queen in the hit show
                Medieval Times, and she recorded vocals for Elvira’s Mistress of
                the Dark 2016 and 2017 live shows. Credits include Polly (Crazy
                For You) and Janet (Rocky Horror).
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
          <div className='bio flex' id='michael_bio'>
            <img className='bio-pic' src={michaelsPhoto} alt='Michael Zeta' />
            <div className='bio-text'>
              <h3>Michael Zeta</h3>
              <h5>As Rutger Gunnarsson</h5>
              <p>
                Michael is a multi-instrumentalist and has been performing since
                the age of 12. When he's not disco dancing with The FABBA Show,
                he can be found in the studio recording with his original band,
                The Second Messenger or teaching the next generation of
                musicians at Rockstars of Tomorrow how to rock the stage.
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
        </div>
      </main>
      <Footer />
    </>
  )
}

export default About
