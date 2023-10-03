import styles from '../../styles/BookList.module.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';


const Book = ({ book, droppableId, favoriteToggle }) => {

    const handleFavoriteToggle = (e) => {
        e.preventDefault();        
        favoriteToggle(book.ISBN, droppableId);  
    }

    const show = window.innerWidth > 768 ? true : false;

    return (
        <div className={styles.book} id={book.ISBN}>
            <img 
                className={styles[`${droppableId}-img`]}
                src={book.cover}
                alt={`of book ${book.title}`}
            />
            <span className={`${styles['favorite-icon']} ${show ? '' : styles['hide-favs-icon']}`}
                onClick={handleFavoriteToggle}>
                {book.isFavorite ? <FaHeart /> : <FaRegHeart />}
            </span>
        </div>

    )
}

export default Book;