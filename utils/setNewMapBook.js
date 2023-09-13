const setNewMapBook = (sourceDrop, destinationDrop, sourceBookMap, destinationBookMap) => {

    let book = Array.from(sourceBookMap.values())[sourceDrop.index]

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