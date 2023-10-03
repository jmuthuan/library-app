import styles from '../styles/ReadableList.module.css';

const animateReadList = ()=>{
    const readListSection = document.getElementById('readList');
    
    readListSection.classList.add(styles['animate']);
    setTimeout(()=>{
        readListSection.classList.remove(styles['animate']);       
    }, 600)
    
    

}

export default animateReadList;