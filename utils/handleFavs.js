const handleFavs = (isbn, listId, availableMap, readableMap)=>{

    let newAvailable = new Map(availableMap);
    let newReadable = new Map(readableMap);

    if(listId === 'droppableAvailable'){
        let book = newAvailable.get(isbn);
        book.isFavorite = true;
        newAvailable.delete(isbn);
        newReadable.set(isbn, book);
    }else{
        let book = newReadable.get(isbn)
        newReadable.delete(isbn);
        book.isFavorite = false;
        newAvailable.set(isbn, book);
    }

    return {newAvailable, newReadable}
}

export default handleFavs;