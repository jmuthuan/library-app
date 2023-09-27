import styles from '../../styles/About.module.css';
import { Saira } from 'next/font/google';

const font = Saira({
    weight: ['400', '700'],
    subsets: ['latin']
})

const About = () =>{
    return(
        <main className={`${font.className} ${styles.main}`}>
              <h3>About Page</h3>
        </main>
      
    )
}

export default About;



