import styles from '../styles/BookList.module.css';

const animateBookReverse = (id) =>{
    const book = document.getElementById(id);

    book.classList.add(styles['animate-reverse']);

    setTimeout(()=>{
        book.classList.remove(styles['animate-reverse']);
    }, 350)

}

export default animateBookReverse;