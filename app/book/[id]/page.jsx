//'use client'
import getBookData from '../../../utils/getBookData';
import styles from '../../../styles/BookDetail.module.css';
import { Saira } from 'next/font/google';

const font = Saira({
    weight: ['400', '700'],
    subsets: ['latin']
})

const BookDetail = async ({ params }) => {

    let bookDetail = await getBookData(params.id);   

    return (
        <main className={`${font.className} ${styles.main}`}>
            <div className={styles.book}>
                <img src={bookDetail.cover} alt={`cover of book ${bookDetail.title}`} />
                <section className={styles['book-info']}>
                    <h2 className={styles.h2}>{bookDetail.title}</h2>
                    <p><span className={styles.underline}>Synopsis:</span> {bookDetail.synopsis}</p>
                    <p><span className={styles.underline}>Genre:</span> {bookDetail.genre}</p>
                    <p><span className={styles.underline}>Pages:</span> {bookDetail.pages}</p>
                    <p><span className={styles.underline}>Year:</span> {bookDetail.year}</p>

                    <article className={styles.author}>
                        <p><span className={styles.underline}>Author:</span> {bookDetail.author.name}</p>
                        <ul className={styles.ul}>Other Books:
                            {bookDetail.author.otherBooks.map(book => {
                                return (<li className={styles.li} key={book}>{book}</li>)
                            })
                            }
                        </ul>
                    </article>
                </section>
            </div>
        </main>
    )
}

export default BookDetail;