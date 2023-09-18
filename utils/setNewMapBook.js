import filterBooks from "./filterBooks";

const setNewMapBook = (sourceDrop, destinationDrop, sourceBookMap, destinationBookMap, genreFilter, maxPages) => {

    let book = filterBooks(sourceBookMap, genreFilter, maxPages)[sourceDrop.index]
    const isbn = book.ISBN;
  
    let destinationBookArray = Array.from(destinationBookMap.values());
    destinationBookArray.splice(destinationDrop.index, 0, book)

    let newDestinationBookMap = new Map();
    destinationBookArray.forEach((book) => {
        newDestinationBookMap.set(book.ISBN, book)
    })

    let sourceBookArray = Array.from(sourceBookMap.values());
    const sourceIndex = sourceBookArray.findIndex(element => element.ISBN === isbn)       
    let newSourceBookMap = new Map()

    sourceBookArray.splice(sourceIndex, 1); /// 
    if (sourceDrop.droppableId === destinationDrop.droppableId) {
        const destinationIndex = destinationBookArray.findIndex(element => element.ISBN === isbn)
        sourceBookArray.splice(destinationIndex, 0, book);
    }

    sourceBookArray.forEach((book) =>
        newSourceBookMap.set(book.ISBN, book)
    )
    return { newSourceBookMap, newDestinationBookMap };
}

export default setNewMapBook;