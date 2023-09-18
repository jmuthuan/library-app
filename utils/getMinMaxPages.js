const getMinMaxPages = (books) =>{
   
    let min, max = 0; 

    books.forEach(element => {       
        if(!min){
            min = element.book.pages
        } 
        if(element.book.pages < min){
            min= element.book.pages
        }
        else if(element.book.pages > max){
            max = element.book.pages
        }
    })


    return { min: min , max: max}
}

export default getMinMaxPages;