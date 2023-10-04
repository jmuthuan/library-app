import styles from '../styles/ReadableList.module.css';

const animateOpenClose = (isOpen)=>{

    console.log('test open close', isOpen);
    const readList = document.getElementById('readList');

    console.log(readList);

    if(isOpen){
        readList.classList.remove(styles['animate-show']);
        readList.classList.add(styles['animate-hide']);
    }else{
        readList.classList.remove(styles['animate-hide']);
        readList.classList.add(styles['animate-show']);       
    }

}

export default animateOpenClose;