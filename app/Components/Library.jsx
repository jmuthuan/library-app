'use client'

import { useEffect, useState } from "react";
import BookList from "./BookList";
import getBooks from "@/utils/getBooks";
import getMinMaxPages from "@/utils/getMinMaxPages";
import styles from '../../styles/Library.module.css'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import setNewMapBook from "@/utils/setNewMapBook";
import sortBookMap from "@/utils/sortBookMap";
import styled from "styled-components";
import ArrowHelp from "./ArrowHelp";
import HelpPopUp from "./HelpPopUp";
import ReadableListAlt from "./ReadableListAlt";
import handleFavs from "@/utils/handleFavs";
import animateReadList from "@/utils/animateReadList";
import animateBook from "@/utils/animateBook";
import animateBookReverse from "@/utils/animateBookReverse";
import animateOpenClose from "@/utils/animateOpenClose";
import Loading from "./Loading";

const Library = () => {
    const [allBooks, setAllBooks] = useState([]);
    const [readBooks, setReadBooks] = useState(new Map());
    const [availableBooks, setAvailableBooks] = useState(new Map())
    const [maxPages, setMaxPages] = useState([]);
    const [genreFilter, setGenreFilter] = useState('All');
    const [isHover, setIsHover] = useState(false);
    const [isDraggin, setIsDraggin] = useState(false);
    const [showHelp, setShowHelp] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState();

    useEffect(() => {
        getAllBooks();
    }, [])

    useEffect(() => {
        let available = new Map();
        //restore data From LocalStorage
        let localRead = JSON.parse(localStorage.getItem('readList'));
        if (localRead) {
            let read = new Map();

            localRead.forEach(element => (
                read.set(element[0], element[1])
            ))

            JSON.parse(localStorage.getItem('availableList')).forEach(element => (
                available.set(element[0], element[1])
            ))
            setAvailableBooks(available);
            setReadBooks(read);
        }
        else {
            allBooks.forEach((book) => {
                const newBook = { ...book.book, isFavorite: false };
                available.set(book.book.ISBN, newBook);
            })
            setAvailableBooks(sortBookMap(available))
        }

        let { max } = getMinMaxPages(allBooks)
        setMaxPages(max);

    }, [allBooks])

    useEffect(() => {
        const showHelpLocale = localStorage.getItem('ShowPopUp') === 'false' ? false : true;
        const showHelpSession = sessionStorage.getItem('ShowPopUp') === 'false' ? false : true;

        setShowHelp(showHelpLocale && showHelpSession);

        setIsMobile(window.innerWidth < 768 ? true : false);
    }, [])

    const getAllBooks = async () => {
        let allBk = await getBooks();
        setAllBooks(allBk.library);
    }

    const onChangeRange = (e) => {
        setValue();
        setMaxPages(e.target.value)
    }

    const handleGenre = (e) => {
        setGenreFilter(e.target.value)
    }

    if (allBooks?.length === 0) { return (<Loading />) } 

    let { min, max } = getMinMaxPages(allBooks)
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
        setIsDraggin(false);

        //element dropped out of drop-zone
        if (!destination) return;
        //element dropped in the same location 
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) return;
        //avoid reordenation in available list books    
        if (source.droppableId === 'droppableAvailable' &&
            source.droppableId === destination.droppableId) return;

        //source: Available Book -> destination: Read Books
        if (source.droppableId === 'droppableAvailable') {
            let { newSourceBookMap, newDestinationBookMap } = setNewMapBook(source, destination, availableBooks, readBooks, genreFilter, maxPages);
            setReadBooks(newDestinationBookMap)
            setAvailableBooks(sortBookMap(newSourceBookMap))

            localStorage.setItem('readList', JSON.stringify([...newDestinationBookMap]))
            localStorage.setItem('availableList', JSON.stringify([...newSourceBookMap]))
        }

        //source: Read Books -> destination: Available Books
        else if (source.droppableId === 'droppableRead' &&
            destination.droppableId === 'droppableAvailable') {
            let { newSourceBookMap, newDestinationBookMap } = setNewMapBook(source, destination, readBooks, availableBooks, genreFilter, maxPages);
            setReadBooks(newSourceBookMap)
            setAvailableBooks(sortBookMap(newDestinationBookMap))

            localStorage.setItem('readList', JSON.stringify([...newSourceBookMap]))
            localStorage.setItem('availableList', JSON.stringify([...newDestinationBookMap]))
        }

        //source and destination: Read Books (reorder Book List by dropping)
        else {
            let { newSourceBookMap } = setNewMapBook(source, destination, readBooks, readBooks, genreFilter, maxPages)
            setReadBooks(newSourceBookMap)
            localStorage.setItem('readList', JSON.stringify([...newSourceBookMap]))
        }
    }

    const handleDragStart = () => {
        setIsDraggin(true)
    }

    const handleMouseEnter = () => {
        setIsHover(true);
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }

    const handleShowHelp = (show) => {
        setShowHelp(show);
    }

    const handleOpenRead = () => {
        animateOpenClose(isOpen);
        setTimeout(()=>{
            setIsOpen(prev => !prev);
        }, 150)        
    }


    const favoriteToggle = (isbn, listId) => {
        const { newAvailable, newReadable } = handleFavs(isbn, listId, availableBooks, readBooks);

        if (!isOpen) {
            animateReadList();
            animateBook(isbn);

            setTimeout(() => {
                setAvailableBooks(newAvailable);
                setReadBooks(newReadable);
            }, 350)
        }else{
            setTimeout(()=>{
                setAvailableBooks(newAvailable);
                setReadBooks(newReadable);
            }, 350)
           
            animateBookReverse(isbn);
        }

        localStorage.setItem('readList', JSON.stringify([...newReadable]));
        localStorage.setItem('availableList', JSON.stringify([...newAvailable]));
    }

    //sync browser tabs information
    window.addEventListener('storage', event => {
        let available = new Map();
        JSON.parse(localStorage.getItem('availableList')).forEach(element => (
            available.set(element[0], element[1])
        ))
        setAvailableBooks(available)

        let read = new Map();
        JSON.parse(localStorage.getItem('readList')).forEach(element => (
            read.set(element[0], element[1])
        ))
        setReadBooks(read)


    })

    let timeout = null;

    window.addEventListener('resize', event => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            let mobile = window.innerWidth < 768 ? true : false;
            setIsMobile(mobile);
        }, 200)
    })

    return (
        <>
            <HelpPopUp
                open={showHelp}
                handleShowHelp={handleShowHelp}
            />
            <section className={styles.filters}>
                <div className={styles['filter-pages-container']}>
                    <label htmlFor="range" className={styles.label}>Filter by pages: </label>
                    <span className={styles.span}>{min}</span>
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
                    <span className={styles.span}>{max}</span>
                </div>

                <div className={styles['filter-genre-container']}>
                    <label htmlFor="page-genre" className={styles.label}>Filter by genre: </label>
                    <select className={styles.select} name="page-genre" id="page-genre" onChange={handleGenre}>
                        {
                            genres.map(genre => {
                                return (
                                    <option key={genre} value={genre}>{genre}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </section>

            <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                <section className={`${styles['available-list']} ${isOpen ? styles['available-hide'] : ''}`}>
                    <span className={`${styles['help-span']} ${(isDraggin || showHelp) ? '' : styles['hide-help']}`}>
                        <h3 className={styles.h3}>Available Books: </h3>
                        <BookList
                            books={availableBooks}
                            genreFilter={genreFilter}
                            maxPages={maxPages}
                            droppableId={'droppableAvailable'}
                            favoriteToggle={favoriteToggle} />
                    </span>
                </section>

                <section className={`${styles.helper} ${(isDraggin || showHelp) ? '' : styles['hide-arrow']}`}>
                    <ArrowHelp number={3} />
                    <ArrowHelp number={3} reverse={true} />
                </section>

                <ReadableListAlt
                    readBooks={readBooks}
                    max={max}
                    isHover={isHover}
                    isDraggin={isDraggin}
                    showHelp={showHelp}
                    isOpen={isOpen}
                    isMobile={isMobile}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    favoriteToggle={favoriteToggle}
                    handleOpenRead={handleOpenRead}
                />                
            </DragDropContext>
        </>
    )
}

const Arrow = styled.span`
position: relative;
top: 200px;
right: ${props => props.$index * 20}px;
`

export default Library;