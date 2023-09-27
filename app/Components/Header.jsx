import logo from '../../src/logo1.png';
import styles from '../../styles/page.module.css';
import Link from 'next/link';



const Header = () =>{

    return(
        <header className={styles.header}>
          <div className={styles['header-link']}>
            <span> <Link href={`/`}>Home</Link></span>
            <span> <Link href={`/about`}>About</Link></span>
          </div>
       
          <div className={styles['header-logo']}>
            <Link href={`/`}><img src={logo.src} alt='logo miduteca' /></Link>            
          </div>
        </header>
    )
}

export default Header;

