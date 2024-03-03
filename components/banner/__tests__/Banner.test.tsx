import { render, screen } from '@testing-library/react'
import Banner from './../Banner'

describe('Home', () => {
    it('renders a heading', () => {
        render(<Banner />)

        const heading = screen.getByRole('heading', {
            name: /success becomes habit/i,
        })

        expect(heading).toBeInTheDocument()
    })
})