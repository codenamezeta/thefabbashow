'use client'
import { useState } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import styles from './Audio.module.css'
import { getAudioTracks } from '@/lib/sanityQueries'

type AudioTrack = {
  title: string
  src: string
}
type Playlist = AudioTrack[]

// Get audio tracks from Sanity
const playlist: Playlist = await getAudioTracks()
console.log('playlist:', playlist)

export default function PlayAudio(): React.ReactElement {
  const [currentTrack, setTrackIndex] = useState(0)

  const handleClickPrev = () => {
    console.log('Prev')
    setTrackIndex((currentTrack) =>
      currentTrack > 0 ? currentTrack - 1 : playlist.length - 1
    )
  }

  const handleClickNext = () => {
    console.log('Next')
    setTrackIndex((currentTrack) =>
      currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
    )
  }

  const playerHeader = (
    <ul className={styles.playlistHeader}>
      {playlist.map(
        (track: AudioTrack, index: number): React.ReactElement | null => (
          <li
            key={index}
            className={`${styles.playlistItem} ${
              currentTrack === index ? styles.active : ''
            }`}
            onClick={() => setTrackIndex(index)}
          >
            <h3 className={styles.playlistItemTitle}>{track.title}</h3>
          </li>
        )
      )}
    </ul>
  )
  if (playlist.length >= 1) {
    return (
      <section>
        <div className='container'>
          <h2>Music</h2>
          <AudioPlayer
            volume={0.67}
            autoPlayAfterSrcChange
            src={playlist[currentTrack].src}
            showSkipControls
            showJumpControls={false}
            onClickPrevious={handleClickPrev}
            onClickNext={handleClickNext}
            onEnded={handleClickNext}
            header={playerHeader}
            onError={() => {
              console.log('Audio player error')
            }}
            className={styles.audioPlayer}
          />
        </div>
      </section>
    )
  } else {
    return <></>
  }
}
