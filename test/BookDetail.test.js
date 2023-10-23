import { render, waitFor } from '@testing-library/react';
import BookDetail from '../app/book/[id]/page';

const params = {
    params: {params:{id:'978-0618640157'}}
}

test('book details', ()=>{
    //const component = render(<BookDetail params={params} />)

    render(<div>Testing</div>)

})