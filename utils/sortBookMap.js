const sortBookMap = (mapBook) => {
    //by default sort by Title

    let arrayTitle = [];
    let arrayISBN = [];
    mapBook.forEach(book => {
        arrayTitle.push(book.title);
        arrayISBN.push(book.ISBN)
    });

    let sortedTitle = arrayTitle.toSorted();

    let sortMap = new Map();

    sortedTitle.forEach((title)=>{
        let isbn = arrayISBN[arrayTitle.indexOf(title)]
        sortMap.set(isbn, mapBook.get(isbn))
    })
    return sortMap;

}

export default sortBookMap;