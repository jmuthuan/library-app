'use client'
import getBooks from "@/utils/getBooks";
import styles from '../../styles/BookList.module.css'
import Book from "./Book";
import Link from "next/link";
import { Draggable, Droppable } from "react-beautiful-dnd";

const BookList = ({ books, genreFilter, maxPages, onClickBook, droppableId }) => {

    let bookArray = []; 
    
    books.forEach((value) => {
        if (genreFilter === 'All' || genreFilter === value.genre) {
            if (value.pages <= maxPages) {
                bookArray.push(value);
            }
        }
    })

    

    return (
        <><span> {bookArray.length} books</span>
            <Droppable droppableId={droppableId} >
                {(provided, snapshot) => (
                    <div className={`${styles['book-container']} ${snapshot.isDraggingOver ? styles['drag-over']: ''}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}                        
                    >

                        {bookArray.map((book, index) => {
                            return (
                                <Draggable key={book.ISBN}
                                    index={index}
                                    draggableId={book.ISBN}>
                                    {(provided, snapshot) => (
                                        <Link href={`book/${book.ISBN}`}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps} >
                                            <Book
                                                book={book}
                                                onClickBook={onClickBook} />
                                        </Link>
                                    )}
                                </Draggable>
                            )
                        })}
                        {provided.placeholder}
                    </div>)}
            </Droppable>
        </>


    )
}

export default BookList;