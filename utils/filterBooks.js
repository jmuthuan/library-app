const filterBooks = (bookMap, genreFilter='All', maxPages=Infinity) =>{

    let bookArray = [];

    bookMap.forEach((value) => {
        if (genreFilter === 'All' || genreFilter === value.genre) {
            if (value.pages <= maxPages) {
                bookArray.push(value);
            }
        }
    })

    return bookArray;

}

export default filterBooks;