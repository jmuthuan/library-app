import Header from "@/app/Components/Header"
import {render} from '@testing-library/react'

//const { default: Header } = require("@/app/Components/Header")
//const { render } = require("@testing-library/react")

test('Header test', ()=>{
    const component = render(<Header />)
    component.getByText('Home');
    component.getByAltText('logo miduteca')
})