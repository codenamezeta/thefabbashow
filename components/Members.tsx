import Image from 'next/image'
import styles from './Members.module.css'

export default function Members() {
  return (
    <section className={styles.members}>
      <div className={`container ${styles.content}`}>
        <h2 className='textStroke'>Meet the Cast</h2>
        <div className={styles.member}>
          <Image
            src='/imgs/avatars/andy-01.jpg'
            alt='Bjorn'
            width={400}
            height={300}
          />
          <h3>Andy Marshall</h3>
          <span>As</span>
          <span>Björn Ulvaeus</span>
        </div>
        <div className={styles.member}>
          <Image
            src='/imgs/avatars/mc-01.jpg'
            alt='Anni-Frid'
            width={400}
            height={300}
          />
          <h3>Marie-Claire Marshall</h3>
          <span>As</span>
          <span>Anni-Frid Lyngstad</span>
        </div>
        <div className={styles.member}>
          <Image
            src='/imgs/avatars/julie-01.jpg'
            alt='Agnetha'
            width={400}
            height={300}
          />
          <h3>Julianne Ruck</h3>
          <span>As</span>
          <span>Agnetha Fältskog</span>
        </div>
        <div className={styles.member}>
          <Image
            src='/imgs/avatars/lars-01.jpeg'
            alt='Benny'
            width={400}
            height={300}
          />
          <h3>Lars Midthun</h3>
          <span>As</span>
          <span>Benny Andersson</span>
        </div>
      </div>
    </section>
  )
}
