import styles from '../styles/BookList.module.css';

const animateBook = (id) =>{
    const book = document.getElementById(id);

    book.classList.add(styles['animate-book']);

    setTimeout(()=>{
        book.classList.remove(styles['animate-book']);
    }, 350)
}

export default animateBook;