import BookList from "@/app/Components/BookList";
import { act, prettyDOM, render, waitFor } from "@testing-library/react";
import books from '../src/books.json';
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";





jest.mock('react-beautiful-dnd', () => ({
    Droppable: ({ children }) =>
      children(
        {
          draggableProps: {
            style: {},
          },
          innerRef: jest.fn(),
        },
        {}
      ),
    Draggable: ({ children }) =>
      children(
        {
          draggableProps: {
            style: {},
          },
          innerRef: jest.fn(),
        },
        {}
      ),
  })
)

let availableBooks = new Map();
books.library.forEach((book) => {
    const newBook = { ...book.book, isFavorite: false };
    availableBooks.set(book.book.ISBN, newBook);
})


const option = {
    books:  availableBooks,
    genreFilter: 'All',
    maxPages: '1200',
    droppableId: 'droppableAvailable',
    testMaxPages: '300',
    testGenreFilter: 'Terror'
}



test('Available Book List (max pages: 1200, genres: All)', async () => {

    const user = userEvent.setup();

    const available = render( 
    <BookList
        books={option.books}
        genreFilter={option.genreFilter}
        maxPages={option.maxPages}
        droppableId={'droppableAvailable'}    />  
    )

    await waitFor(() => {
        available.getByText('13 books')
    })
/* 
    //find book ISBN: 978-0618640157
    const books = available.getAllByRole('link')
    expect(books).toBeDefined();
    expect(books.length).toBe(13);
    //console.log(prettyDOM(books[0]))

    //await user.click(books[0])
    

    user.pointer({keys: '[MouseLeft>]', target: books[0]})
    user.pointer({keys: '[/MouseLeft]'})
    user.pointer([
      // touch the screen at books[0]
      {keys: '[MouseLeft>]', target: books[0]},
      // move the touch pointer to element2
      {pointerName: 'TouchA', target: element2},
      // release the touch pointer at the last position (element2)
      {keys: '[/TouchA]'},
    ]) */


    /* user.pointer([
      // touch the screen at element1
      {keys: '[TouchA>]', target: element1},
      // move the touch pointer to element2
      {pointerName: 'TouchA', target: element2},
      // release the touch pointer at the last position (element2)
      {keys: '[/TouchA]'},
    ]) */
    

  
    

});

test('Filtering test (max pages: 300, genres: Terror)', async () => {
    const available = render( 
    <BookList
        books={option.books}
        genreFilter={option.testGenreFilter}
        maxPages={option.testMaxPages}
        droppableId={'droppableAvailable'}    /> 
    )

    await waitFor(() => {
        available.getByText('2 books')
    })
});
