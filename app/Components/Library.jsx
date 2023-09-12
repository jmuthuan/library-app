'use client'

import { useEffect, useState } from "react";
import BookList from "./BookList";
import getBooks from "@/utils/getBooks";
import getMinMaxPages from "@/utils/getMinMaxPages";
import styles from '../../styles/Library.module.css'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const Library = () => {
    const [allBooks, setAllBooks] = useState([]);
    const [readBooks, setReadBooks] = useState(new Map());
    const [availableBooks, setAvailableBooks] = useState(new Map())
    const [maxPages, setMaxPages] = useState(0);
    const [genreFilter, setGenreFilter] = useState('All');

    useEffect(() => {
        getAllBooks();
    }, [])

    useEffect(() => {
        let available = new Map();
        allBooks.forEach((book) => {
            available.set(book.book.ISBN, book.book)
        })
        setAvailableBooks(available)

        let { max } = getMinMaxPages(available)
        setMaxPages(max);

    }, [allBooks])

    const getAllBooks = async () => {
        let allBk = await getBooks();
        setAllBooks(allBk.library);
    }

    const onClickBook = (bookData) => {
        let read = new Map(readBooks);
        let available = new Map(availableBooks);

        if (read.has(bookData.ISBN)) {
            read.delete(bookData.ISBN);
            available.set(bookData.ISBN, bookData);

        } else {
            read.set(bookData.ISBN, bookData);
            available.delete(bookData.ISBN);

        }
        setReadBooks(read);
        setAvailableBooks(available);
    }

    const onChangeRange = (e) => {
        setValue();
        setMaxPages(e.target.value)
    }

    const handleGenre = (e) => {
        setGenreFilter(e.target.value)
    }

    if (allBooks?.length === 0) { return (<div>Loading...</div>) } //TODO - Loading skeleton

    let { min, max } = getMinMaxPages(availableBooks)
    let genres = ['All'];

    allBooks.forEach((book) => {
        if (!genres.includes(book.book.genre)) {
            genres.push(book.book.genre)
        }
    })


    //***************************** */

    const setValue = () => {
        const range = document.getElementById('range');
        const rangeV = document.getElementById('rangeV');
        const newValue = (range.value - range.min) * 100 / (range.max - range.min);
        const newPosition = 10 - (newValue * 0.2);
        rangeV.innerHTML = `<span>${range.value}</span>`;
        rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
    };

    const handleDragEnd = ({ destination, source }) => {
        // reorder list
        

        if(!destination) return;
        if(destination.droppableId === source.droppableId &&
            destination.index === source.index) return;

        console.log('destination', destination);
        console.log('source', source)
    }



    return (
        <>
            <section className={styles.filters}>
                <label htmlFor="range">Filter by max-pages: </label>
                <span>min: {min}</span>
                <div className={styles['range-wrap']}>
                    <div className={styles['range-value']} id="rangeV"></div>
                    <input
                        type="range"
                        id='range'
                        name='range'
                        min={min}
                        max={max + 50}
                        value={maxPages}
                        step={50}
                        onChange={onChangeRange} />
                </div>
                <span> max: {max}</span>
                <br />

                <label htmlFor="page-genre">Filter by genre: </label>
                <select name="page-genre" id="page-genre" onChange={handleGenre}>
                    {
                        genres.map(genre => {
                            return (
                                <option key={genre} value={genre}>{genre}</option>
                            )
                        })
                    }
                </select>
            </section>

            <DragDropContext onDragEnd={handleDragEnd}>
                <section className={styles['available-list']}>
                    <h3>Available Books: </h3>
                    <BookList
                        books={availableBooks}
                        genreFilter={genreFilter}
                        maxPages={maxPages}
                        onClickBook={onClickBook}
                        onDragEnd={handleDragEnd}
                        droppableId={'droppableAvailable'} />
                </section>


                <section className={styles["readable-list"]}>
                    <h3>Read List Books: </h3>
                    <BookList
                        books={readBooks}
                        genreFilter={'All'}
                        maxPages={maxPages}
                        onClickBook={onClickBook}
                        droppableId={'droppableRead'} />
                </section>
            </DragDropContext>
        </>
    )
}




export default Library;