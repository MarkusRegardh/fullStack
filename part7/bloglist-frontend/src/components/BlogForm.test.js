import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('Blog form calls the event handler with correct data', async () => {

    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm addBlog={createBlog} />)

    const input = screen.getAllByRole('textbox')
    const send = screen.getByText('save')

    await user.type(input[0], 'How to test a form')
    await user.type(input[1], 'Teppo Test')
    await user.type(input[2], 'www.test.com')
    await user.click(send)

    expect(createBlog.mock.calls).toHaveLength(1)
    const blog = createBlog.mock.calls[0][0]
    expect(blog.title).toBe('How to test a form')
    expect(blog.url).toBe('www.test.com')
    expect(blog.author).toBe('Teppo Test')
    

})