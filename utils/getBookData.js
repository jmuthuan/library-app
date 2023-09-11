import booksDB from '../src/books.json'

const getBookData = async (id) =>{
    let bookData = await fetchBook(id);
    return bookData
}

const fetchBook = (id) =>{
    
    for(let i=0; i < booksDB.library.length; i++){        
        console.log(i)       
        if(booksDB.library[i].book.ISBN === id){            
            return booksDB.library[i].book
        }       
    }; 
}

export default getBookData;