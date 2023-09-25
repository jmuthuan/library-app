'use client'
import getBooks from "@/utils/getBooks";
import styles from '../../styles/BookList.module.css'
import Book from "./Book";
import Link from "next/link";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { styled } from 'styled-components';
import filterBooks from "@/utils/filterBooks";
import { useMemo, useState } from "react";

const Container = styled.div`      
    &.droppableRead{
        position: relative;
        bottom: ${props => (props.$hover? props.$index*0 : props.$index * 200)}px;
        transform: rotate(${props => props.$angle}deg);
        z-index: ${props => props.$index};            
    }

    &.droppableRead a {
        padding:3px;  
    }
`

const BookContainer = styled.div`
&.${styles[`droppableRead-container`]}{
    height: ${(props) => (props.$hover? (props.$length*255) : (props.$length) * 92 +215*0)*1}px;
}
`
const BookList = ({ books, genreFilter, maxPages, droppableId, isHover, onMouseEnter, onMouseLeave }) => {

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
                    onMouseEnter={onMouseEnter}   
                    onMouseLeave={onMouseLeave} 
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        $length={bookArray.length}  
                        $hover={isHover}                     
                    >

                        {bookArray.map((book, index) => {
                            return (
                                <Draggable key={book.ISBN}
                                    index={index}
                                    draggableId={book.ISBN}>
                                    {(provided, snapshot) => (                                        
                                        <Container className={`${droppableId} ${styles['droppableRead']}`}                                                                               
                                            $index={index}
                                            $angle={angles[index]}
                                            $hover={isHover}                                          
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