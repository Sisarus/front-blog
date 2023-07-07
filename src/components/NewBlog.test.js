import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlog from './NewBlog'

test('<NewBlog /> post new Blog', async() => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<NewBlog addNewBlog={createBlog}/>)


  const inputTitle = screen.getAllByRole('textbox')[0]
  const inputAuthor = screen.getAllByRole('textbox')[1]
  const inputUrl = screen.getAllByRole('textbox')[2]
  const sendButton = screen.getByText('save')

  await user.type(inputTitle, 'Otsikko')
  await user.type(inputAuthor, 'Kirjoittaja')
  await user.type(inputUrl, 'nettisivuosoite')
  await user.click(sendButton)


  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Otsikko')
  expect(createBlog.mock.calls[0][0].author).toBe('Kirjoittaja')
  expect(createBlog.mock.calls[0][0].url).toBe('nettisivuosoite')

})