import styles from '../styles/BookList.module.css';

const animateAvailableBook = (id) =>{
    const book = document.getElementById(id);

    book.classList.add(styles['animate-book']);

    setTimeout(()=>{
        book.classList.remove(styles['animate-book']);
        console.log('test remove');
    }, 350)
}

export default animateAvailableBook;