'use client'
import getBooks from "@/utils/getBooks";
import styles from '../../styles/BookList.module.css'
import Book from "./Book";
import Link from "next/link";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { styled } from 'styled-components';
import filterBooks from "@/utils/filterBooks";
import { Ma_Shan_Zheng } from "next/font/google";
import { useMemo, useState } from "react";

const Container = styled.div`      
    &.droppableRead{
        position: relative;
        bottom: ${props => (props.$index * 170)}px;
        transform: rotate(${props => props.$angle}deg);
        z-index: ${props => props.$index};       
    }

    &.droppableRead a {
        padding:3px;  
    }
`

const BookContainer = styled.div`
&.${styles[`droppableRead-container`]}{
    height: ${(props) => ((props.$length) * 92 + 215 + (props.$drag * 1))}px;
}
`
const BookList = ({ books, genreFilter, maxPages, droppableId }) => {

    const [angles, setAngles] = useState([]);

    let bookArray = filterBooks(books, genreFilter, maxPages);
    
    useMemo(() => {
        let aux = []
        bookArray.forEach(() => {
            aux.push(Math.random() * 20 - 10)
        })      
        setAngles(aux);
    }, [bookArray.length])

    return (
        <><span> {bookArray.length} books</span>
            <Droppable droppableId={droppableId} >
                {(provided, snapshot) => (
                    <BookContainer className={`${styles['book-container']} ${styles[`${droppableId}-container`]} ${snapshot.isDraggingOver ? styles['drag-over'] : ''}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        $length={bookArray.length}
                        $drag={`${snapshot.isDraggingOver ? 300 : 0}`}
                    >

                        {bookArray.map((book, index) => {
                            return (
                                <Draggable key={book.ISBN}
                                    index={index}
                                    draggableId={book.ISBN}>
                                    {(provided, snapshot) => (                                        
                                        <Container className={droppableId}
                                            $index={index}
                                            $angle={angles[index]}                                          
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                            <Link href={`book/${book.ISBN}`}>                                                                                         
                                                <Book
                                                    book={book}
                                                    />
                                            </Link>
                                        </Container>
                                    )}
                                </Draggable>
                            )
                        })}
                        {provided.placeholder}
                    </BookContainer>)}
            </Droppable>
        </>


    )
}

export default BookList;