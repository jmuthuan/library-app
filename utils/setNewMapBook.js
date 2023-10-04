import filterBooks from "./filterBooks";

const setNewMapBook = (sourceDrop, destinationDrop, sourceBookMap, destinationBookMap, genreFilter, maxPages) => {

    let book = filterBooks(sourceBookMap, genreFilter, maxPages)[sourceDrop.index]

    if(destinationDrop.droppableId === 'droppableAvailable'){
        console.log('available')
        book.isFavorite = false;
    }else{
        console.log('read')
        book.isFavorite = true;
    }

    const isbn = book.ISBN;
  
    let destinationBookArray = Array.from(destinationBookMap.values()); 
    destinationBookArray.splice(destinationDrop.index, 0, book)   

    let newDestinationBookMap = new Map();
    destinationBookArray.forEach((book) => {
        newDestinationBookMap.set(book.ISBN, book)
    })

    let sourceBookArray = Array.from(sourceBookMap.values());
   
    let newSourceBookMap = new Map()

    sourceBookArray.splice(sourceDrop.index, 1);     
    if (sourceDrop.droppableId === destinationDrop.droppableId) {        
        sourceBookArray.splice(destinationDrop.index, 0, book);
    }

    sourceBookArray.forEach((book) =>
        newSourceBookMap.set(book.ISBN, book)
    )
    return { newSourceBookMap, newDestinationBookMap };
}

export default setNewMapBook;