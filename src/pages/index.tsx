import Header from '../components/header/Header'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

const inter = {fontFamily: 'verdana'}

export default function Home() {
  return (
    <>
<Header/>
      <main className={styles.main}>
        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>
      </main>
    </>
  )
}
