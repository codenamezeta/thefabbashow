import Video from '../vids/promo.mp4'
import Nav from '../components/nav/Nav'
import logo from '../imgs/logo-01.png'
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa'
import { useRef, useState, useEffect } from 'react'

const Home = ({ promoVid }) => {
  //@useState() is need for video controls to reflect the current state of the video
  const [paused, setPaused] = useState(false)
  //@muted state is needed because useRef() is undefined until after rendering when the reference can attach to video node.
  const [muted, setMuted] = useState(true)
  //@video is a reference to the video element in the DOM that is created during component rendering
  const video = useRef()
  //@seekSlider is a reference to the range input in the video controls
  const seekSlider = useRef()
  //@volumeSlider is a reference to the range input in the video controls
  const volumeSlider = useRef()
  //@videoControls is a reference to all the video controls for hidding and showing controls section during playback
  const videoControls = useRef()
  //@useEffect sets the video's volume to 1/3rd instead of 100% incase users decide to hit the unmute button before adjusting volume slider
  useEffect(() => {
    video.current.volume = 0.33
    showHide()
  })

  const playPause = () => {
    if (paused) {
      video.current.play()
      setPaused(false)
    } else {
      video.current.pause()
      setPaused(true)
      showHide()
    }
  }

  //* Checks the reference to the video node
  //* Then toggles mute property using the video node's built-in property
  //? https://www.w3schools.com/tags/ref_av_dom.asp
  //* And updates the state so that the rendered mute button can check if muted using state hook rather than ref hook
  //? https://stackoverflow.com/questions/61483255/typeerror-ref-current-is-undefined-useref
  const muteToggle = () => {
    if (video.current.muted) {
      video.current.muted = false
      setMuted(false)
      volumeSlider.current.value = 0.33
      // if (video.current.volume <= 0) {
      //   volumeSlider.current.value = 0.2
      //   console.log(volumeSlider.current.value)
      //   video.current.volume = 0.2
      // }
    } else {
      video.current.muted = true
      setMuted(true)
      volumeSlider.current.value = 0
    }
  }

  const adjustVolume = () => {
    video.current.volume = volumeSlider.current.value
    // console.log(video.current.volume)
    // console.log(volumeSlider.current.value)
    if (volumeSlider.current.value > 0) {
      video.current.muted = false
      setMuted(false)
    } else {
      video.current.muted = true
      setMuted(true)
    }
  }

  const seek = () => {
    let seekTo = video.current.duration * (seekSlider.current.value / 100)
    video.current.currentTime = seekTo
  }

  const seekTimeUpdate = () => {
    let newTime = video.current.currentTime * (100 / video.current.duration)
    seekSlider.current.value = newTime
  }

  const showHide = () => {
    videoControls.current.classList.remove('hide-video-controls')
    if (!paused) {
      setTimeout(() => {
        videoControls.current.classList.add('hide-video-controls')
      }, 4500)
    } else return
  }

  return (
    <>
      <Nav logo={logo} transparency />
      <main id="fullscreen_section" onMouseMove={showHide}>
        <video
          autoPlay
          muted
          loop
          // controls
          poster="../imgs/fabba-03.jpg"
          className="fullscreen-bg-video"
          id="frontpage_video"
          src={promoVid}
          type="video/mp4"
          ref={video}
          onTimeUpdate={seekTimeUpdate}
        >
          <source src={Video} />
        </video>

        <div className="video-controls" ref={videoControls}>
          <span id="play_pause_btn" onClick={playPause}>
            {paused ? <FaPlay /> : <FaPause />}
          </span>

          <input
            id="volume_slider"
            ref={volumeSlider}
            type="range"
            min="0.0"
            max="1.0"
            defaultValue="0.33"
            step="0.01"
            onChange={adjustVolume}
          />
          <span id="mute_btn" onClick={muteToggle}>
            {muted ? <FaVolumeMute /> : <FaVolumeUp />}
          </span>
          <input
            id="seek_slider"
            ref={seekSlider}
            type="range"
            min="0"
            max="100"
            defaultValue="0"
            step="0.01"
            onChange={seek}
          />
        </div>
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
            <a
              href="https://www.paypal.com/donate?business=R96WVXL2HA5TG&item_name=Thank+you%21+We+split+our+tips+between+all+6+fabulous+musicians%2C+Marie-Claire%2C+Julianne%2C+Andy%2C+Robert%2C+Michael+and+Gustavo.&currency_code=USD"
              className="button button-outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tips
            </a>
            <a href="/events" className="button button-outline">
              Events
            </a>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
