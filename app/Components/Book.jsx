import styles from '../../styles/BookList.module.css';

const Book = ({ book }) => {   
    
    return (
        <div className={styles.book}>
            <img
                src={book.cover}
                alt={`of book ${book.title}`}
                />
        </div>

    )
}

export default Book;