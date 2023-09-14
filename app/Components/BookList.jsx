'use client'
import getBooks from "@/utils/getBooks";
import styles from '../../styles/BookList.module.css'
import Book from "./Book";
import Link from "next/link";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { styled } from 'styled-components';

const Container = styled.div`    
    margin: 20px;    

    &.droppableRead{
        position: absolute;
        top: ${(props) => (props.index * 75)}px;
        transform: rotate(${() => (Math.random() * 20) - 10}deg);
        z-index: ${(props) => (props.index)}
        heigth: ${(props)=>(props.index)}
    }

    &.droppableRead a {
        background-color: yellow;
        padding:3px;        
    }    
    
`



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
                    <div className={`${styles['book-container']} ${droppableId} ${snapshot.isDraggingOver ? styles['drag-over'] : ''}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}                        
                    >

                        {bookArray.map((book, index) => {
                            return (
                                <Draggable key={book.ISBN}
                                    index={index}
                                    draggableId={book.ISBN}>
                                    {(provided, snapshot) => (
                                        <Container className={droppableId}
                                            index={index}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                            <Link href={`book/${book.ISBN}`}
                                            /* className={styles[droppableId]} */ >
                                                <Book
                                                    book={book}
                                                    onClickBook={onClickBook} />
                                            </Link>
                                        </Container>
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