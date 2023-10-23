import React from "react";
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import Library from "@/app/Components/Library";
import userEvent from '@testing-library/user-event'


test('Library', async () => {

    const component = render(<Library />)

    const filterPages = 'Filter by pages';
    const filterGenres = 'Filter by genre';
    const available = 'Available Books:';
    const readable = 'Read List Books:';


    await waitFor(() => {
        component.getByText(filterPages, { exact: false });
        component.getByText(filterGenres, { exact: false });
        component.getByText(available, { exact: false });
        component.getByText(readable, { exact: false });

    })

})

test('drag and drop action', async () => {
    const component = render(<Library />)
    const user = userEvent.setup();


    await waitFor(() => {
        //find book ISBN: 978-0618640157
      const books = component.getAllByRole('link')
      expect(books).toBeDefined();
      expect(books.length).toBe(13);

      const closePopUpButton = component.getByText('Close');
      expect(closePopUpButton).toBeDefined();

      const readableList = document.querySelector('#droppableRead');
      expect(readableList).toBeDefined();

      user.pointer([
          { keys: '[MouseLeft]', target: closePopUpButton }
      ])

      user.pointer([
          // touch the screen at books[0]
          { keys: '[MouseLeft]', target: books[0] },
          // move the touch pointer to raedableList
          { pointerName: 'MouseLeft', target: readableList },
          // release the touch pointer at the last position (element2)
          { keys: '[/MouseLeft]', target: readableList },
      ])

  })


})