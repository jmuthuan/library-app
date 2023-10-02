import styles from '../../styles/ReadableList.module.css';
import { useState } from 'react';
//import styles from '../../styles/Library.module.css';
import { FaChevronLeft, FaTimes } from 'react-icons/fa';
import BookList from "./BookList";

const ReadableListAlt = ({ isDraggin, isOpen, showHelp, readBooks,
    max, isHover, handleMouseEnter, handleMouseLeave, favoriteToggle, handleOpenRead }) => {

    if (window.innerWidth < 768) {
        
        return (
            <section className={`${styles['readable-list']} ${!isOpen ? styles['hide-readable'] : styles['show-readable']}`}>
                <div className={`${isOpen ? styles['title-icon-show'] : styles['title-icon']}`}>
                    <FaChevronLeft className={`${isOpen ? styles['hide-item'] : styles['show-item']} ${styles['item']}`}
                        onClick={handleOpenRead} />
                    <FaTimes className={`${!isOpen ? styles['hide-item'] : styles['show-item']} ${styles['item']}`}
                        onClick={handleOpenRead} />
                    <h3 className={`${isOpen? styles['h3-show']: styles['h3-hide']}`}>Read List Books </h3>
                </div>
   
                <BookList
                            books={readBooks}
                            genreFilter={'All'}
                            maxPages={max}
                            droppableId={'droppableRead'}
                            isHover={true}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            favoriteToggle={favoriteToggle} />
            </section>
        )
    }
    else {
        return (
            <section className={styles["readable-list"]}>
                <span className={`${styles['help-span']} ${(isDraggin || showHelp) ? '' : styles['hide-help']}`}>
                    <h3 className={styles.h3}>Read List Books: </h3>
                    <BookList
                        books={readBooks}
                        genreFilter={'All'}
                        maxPages={max}
                        droppableId={'droppableRead'}
                        isHover={isHover}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        /* favoriteToggle={favoriteToggle}  *//>
                </span>
            </section>
        )
    }
}

export default ReadableListAlt;