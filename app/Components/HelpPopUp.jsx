import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import styles from '../../styles/HelpPopUp.module.css';
import '../../styles/ModalPopUp.css';
import { Saira } from 'next/font/google';

const font = Saira({
    weight: ['400', '700'],
    subsets: ['latin']
  })

const HelpPopUp = ({open, handleShowHelp}) => {

    if(!open) return;

    const handleClose = (close)=>{
    const checkValue = document.getElementById('help-cancel').checked;
    
    if(checkValue){
        localStorage.setItem('ShowPopUp', 'false');
    }  
        sessionStorage.setItem('ShowPopUp', 'false');      
        handleShowHelp(false);
        close();
       
    }

    return (
        <Popup     
            modal
            nested
            open        
        >
            {close => (
                <div className={styles['modal']}>
                    <button className={styles['close']} onClick={()=>handleClose(close)}>
                        &times;
                    </button>
                    <div className={styles['header']}> Welcome!!! </div>
                    <div className={styles['content']}>
                        {' '}
                        On the site you have two list of books. One of this list is 'Available Books',
                        where you can click on any book to get more information about it.
                        Additionally, you can select your favourites books and place them in the
                        'Readable Books List' using a drag and drop action.
                        <br />
                        Also, in the 'Readable Book List' you can reorder the books as you like
                        by dragging and dropping them.
                        <br />
                        If you use a mobile device you don't have the drag and drop action and can't reorder the books either, 
                        but you have a heart shape button to select your favourites books. 
                        <br/>
                        The site allows you to filter the available books by the maximum number of pages and/or their genres.
                    </div>
                    <hr />
                    <div className={styles['actions']}>
                        <div>
                            <input type="checkbox" id="help-cancel" name="help-cancel" value="true" />
                            <label htmlFor="help-cancel"> Don't show this help again</label>
                        </div>
                        
                        <button
                            type='button'
                            className={font.className}                               
                            onClick={()=>handleClose(close)}
                        >
                            Close
                        </button>
                        
                    </div>
                </div>
            )}
        </Popup>
    )

}

export default HelpPopUp;