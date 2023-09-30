import styles from '../../styles/ReadableList.module.css';
import { useState } from 'react';
//import styles from '../../styles/Library.module.css';
import { FaChevronLeft, FaTimes } from 'react-icons/fa'

const ReadableListAlt = ({ isDraggin, showHelp }) => {
    const [isOpen, setIsOpen] = useState(false);


    const handleOpenRead = () => {       
        setIsOpen(prev => !prev);
    }

    return (
        <section className={`${styles['readable-list']} ${!isOpen ? styles['hide-readable'] : styles['show-readable']}`}>
            <div className={styles['title-icon']}>
                <FaChevronLeft className={`${isOpen ? styles['hide-item'] : styles['show-item']} ${styles['item']}`}
                    onClick={handleOpenRead} />
                <FaTimes className={`${!isOpen ? styles['hide-item'] : styles['show-item']} ${styles['item']}`}
                    onClick={handleOpenRead} />                    
                <h3 className={styles.h3}>Read List Books </h3>
            </div>
            <div style={{ width: '100px', height: '500px', backgroundColor: 'red' }}>

            </div>
            {/* <BookList
                            books={readBooks}
                            genreFilter={'All'}
                            maxPages={max}
                            droppableId={'droppableRead'}
                            isHover={isHover}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave} /> */}

        </section>
    )

}

export default ReadableListAlt;