import styles from '../../styles/BookList.module.css';

const Book = ({ book, onClickBook }) => {    

    const onClickHandler = () => {
        //onClickBook(book)
        //TODO
    }
    return (
        <div className={styles.book}>
            <img
                src={book.cover}
                alt={`of book ${book.title}`}
                onClick={onClickHandler} />
        </div>

    )
}

export default Book;