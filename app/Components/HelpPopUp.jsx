import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import styles from '../../styles/HelpPopUp.module.css';
import '../../styles/ModalPopUp.css';

const HelpPopUp = ({open, handleShowHelp}) => {

    console.log(open)
    
    if(!open) return;

    const handleClose = ()=>{
    const checkValue = document.getElementById('help-cancel').checked;
    
    if(checkValue){
        localStorage.setItem('ShowPopUp', 'false');
    }        
        handleShowHelp(false);
        close();
    }

    return (
        <Popup
            /*  trigger={<button className={styles['button']}> Open Modal </button>} */
            modal
            nested
            open
            position='top center'            
        >
            {close => (
                <div className={styles['modal']}>
                    <button className={styles['close']} onClick={handleClose}>
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
                        The site allows you to filter the available books by the maximum number of pages and/or their genres.
                    </div>
                    <hr />
                    <div className={styles['actions']}>
                        <div>
                            <input type="checkbox" id="help-cancel" name="help-cancel" value="true" />
                            <label for="help-cancel"> Don't show this help again</label>
                        </div>
                        {/* <Popup
                            trigger={<button className={styles['button']}> Trigger </button>}
                            position="top center"
                            nested
                        >
                            <span>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
                                magni omnis delectus nemo, maxime molestiae dolorem numquam
                                mollitia, voluptate ea, accusamus excepturi deleniti ratione
                                sapiente! Laudantium, aperiam doloribus. Odit, aut.
                            </span>
                        </Popup> */}
                        <button
                            className={styles['button']}
                            onClick={handleClose}
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