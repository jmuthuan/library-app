'use client'
import getBooks from "@/utils/getBooks";
import styles from '../../styles/BookList.module.css'
import Book from "./Book";
import Link from "next/link";

const BookList = ({ books, onClickBook }) => {

    let bookArray = [];

    books.forEach((value) => {
        bookArray.push(value);
    })

    return (

        <div className={styles['book-container']}>
            {
                bookArray.map(book => {
                    return (
                        <Link href={`book/${book.ISBN}`} key={book.ISBN}>
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