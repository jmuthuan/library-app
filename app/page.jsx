//import Image from 'next/image'

import styles from '../styles/page.module.css';
import Library from './Components/Library';

export default function Home() {
 
  return (
    <main className={styles.main}>
      <div className={styles.description}>
          Main Page
            <Library />
      </div>
    </main>
  )
}
