//'use client'
import getBookData from '../../../utils/getBookData';
import styles from '../../../styles/BookDetail.module.css';

const BookDetail =  async ({params})=>{

     let bookDetail = await getBookData(params.id);
     //console.log(bookDetail)
    

    return ( 
        <main>
            <section className={styles.book}>
                <h2>{bookDetail.title}</h2>
                <img src={bookDetail.cover} alt={`cover of book ${bookDetail.title}`}/>
                <p>{bookDetail.synopsis}</p>
                <p>Genre: {bookDetail.genre}</p>
                <p>Pages: {bookDetail.pages}</p>
                <p>Year: {bookDetail.year}</p>
            </section>
            <section className='author'>
                <p>Author: {bookDetail.author.name}</p>
                <ul>Other Books: 
                    {
                        bookDetail.author.otherBooks.map(book => {
                            return(
                                <li>{book}</li>
                            )
                        })
                    }
                </ul>

            </section>
        </main>
    )
}

export default BookDetail;