import styles from '../../styles/About.module.css';
import { Saira } from 'next/font/google';


const font = Saira({
    weight: ['400', '700'],
    subsets: ['latin']
})

const About = () => {

    return (
        <main className={`${font.className} ${styles.main}`}>
            <div className="about-page-wrapper">
                <section className={styles['about-page']}><span className={styles.span}>About Page</span>
                    <div className="about-page-info">
                        <p>
                            This site was created as a technical challenge
                            from <a href='https://github.com/midudev/pruebas-tecnicas/blob/main/pruebas/01-reading-list/README.md'>
                                @midudev</a>.
                        </p>
                        <p>
                            On the site you have two list of books. One of this list is 'Available Books', where you
                            can click on any book to get more information about it. Additionally, you can select your favourites books and
                            place them in the 'Readable Books List' using a drag and drop action.
                            Also, in the 'Readable Book List' you can reorder the books as you like by dragging and dropping them.
                        </p>
                        <p>
                            The site allows you to filter the available books by the maximum number of pages and/or their genres.
                        </p>
                        <p>
                            Hope you enjoy it!!!
                        </p>
                    </div>
                </section>

                <section className={styles['about-technoligies']}><span className={styles.span}>Technologies</span>
                    <div className={styles['about-technologies-info']}>
                        <p>
                            This site was built using Next JS / React. In addition, JSX, HTML and CSS were used.
                        </p>
                        <p>
                            Also was implemented the drag and drop action for desktop devices.
                        </p>
                        <div className={styles['about-technologies-logos']}>
                            <a href="https://nextjs.org/"><img className={styles['img-logo']} src="../logos/next.svg" alt='next logo' /></a>
                            <a href="https://react.dev/"><img className={styles['img-logo']} src="../logos/react.png" alt='react logo' /></a>
                            <a href="https://react.dev/learn/writing-markup-with-jsx"><img className={styles['img-logo']} src="../logos/jsx.png" alt='jsx logo' /></a>
                            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img className={styles['img-logo']} src="../logos/html.svg" alt='html logo' /></a>
                            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img className={styles['img-logo']} src="../logos/css.svg" alt='css logo' /></a>                            
                        </div>
                    </div>
                </section>

                <section className={styles['about-developers']}><span className={styles.span}>Developers Team</span>

                    <div className={styles['about-developers-info']}>
                        <div className={styles['about-developer-avatar-name']}>
                            <img className={styles['about-avatar']} src="../avatar.jpg" alt="developer" />
                            <div className={styles['developer-name']}>José Muthuan</div>
                            <div className={styles['developer-titles']}>Full Stack Developer <br/>& <br/> Electronic Engineer</div>
                            <div className={styles['developer-social-media']}>
                                <a href='https://www.linkedin.com/in/jos%C3%A9-muthuan/'><img src="../logos/linkedin.svg" alt="link to linkedin" /></a>
                                <a href='https://github.com/jmuthuan'><img src="../logos/github.svg" alt="link to github" /></a>
                            </div>
                        </div>
                        <div className={styles['about-developers-person']}>
                            <p>I am an Electronic Engineer with years of experience in industrial maintenance
                                management. I always liked the programming environment: from programming microcontrollers in assembler,
                                industrial PLCs in various languages, to software development. A few years ago I began to explore in
                                languages like Java, mobile development with Android Studio and web development,
                                always learning new tools, libraries and frameworks.
                            </p>
                        </div>
                    </div>
                </section>

                {/* <section className="about_contact"><span>Do you want to make contact?</span>
                    <form
                        className="about_contact_form"
                        name='contact_message'
                        action='https://formspree.io/f/xwkjnobg'
                        method='post'
                    >

                        <label className='form_item' htmlFor='input_name'>Name</label>
                        <input
                            className='form_item'
                            type="text"
                            name='name'
                            placeholder="Enter your full name"
                            id='input_name'
                            required />

                        <label className='form_item' htmlFor='input_email'>Email</label>
                        <input
                            className='form_item'
                            type="email"
                            name='email'
                            placeholder="Enter your email"
                            id='input_email'
                            required />

                        <label className='form_item' htmlFor='input_area'>Comments</label>
                        <textarea
                            className='form_item form_text_area'
                            id='input_area'
                            maxLength={500}
                            required
                            name='comments'
                            placeholder='Feel free to contact me!'></textarea>

                        <button className='form_item btn_submit' type="submit">Send!</button>
                    </form>
                </section> */}
            </div>
        </main>

    )
}

export default About;



