'use client'
import getBooks from "@/utils/getBooks";
import styles from '../../styles/BookList.module.css'
import Book from "./Book";
import Link from "next/link";

const BookList = ({ books, genreFilter, maxPages, onClickBook }) => {

    let bookArray = [];

    console.log(maxPages)

    books.forEach((value) => {
        if (genreFilter === 'All' || genreFilter === value.genre) {
            if(value.pages <= maxPages){
                bookArray.push(value);
            }            
        }
    })

    return (

        <div className={styles['book-container']}>            
                <span> {bookArray.length} books</span>
                {
                    bookArray.map(book => {
                        return (
                            <Link href={`book/${book.ISBN}`} key={book.ISBN} >
                                <Book
                                    book={book}
                                    onClickBook={onClickBook} />
                            </Link>
                        )
                    })
                }        
        </div>

    )
}

export default BookList;