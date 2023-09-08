const getMinMaxPages = (books) =>{
   
    let min, max = 0; 

    books.forEach(value => {
        if(!min){
            min = value.pages
        } 
        if(value.pages < min){
            min= value.pages
        }
        else if(value.pages > max){
            max = value.pages
        }
    })


    return { min: min , max: max}
}

export default getMinMaxPages;