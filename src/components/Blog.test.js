import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('render Blog', () => {
  const blog = {
    title: 'Kuinka testataan react',
    author: 'Kisu Miau'
  }
  const newBlogLike = () => (<></>)

  const removeBlog = () => (<></>)

  render(<Blog blog={blog} newBlogLike={newBlogLike} removeBlog={removeBlog} isOwner={false}/>)

  const element = screen.getByText('Kuinka testataan react Kisu Miau')

  expect(element).toBeDefined()
})

test('view Blog', async() => {
  const blog = {
    title: 'Kuinka testataan react',
    author: 'Kisu Miau',
    likes: 3,
    url: 'osoite@osoite.osoite',
    user: {
      name: 'Oskari'
    }
  }
  const newBlogLike = () => (<></>)

  const removeBlog = () => (<></>)


  render(<Blog blog={blog} newBlogLike={newBlogLike} removeBlog={removeBlog} isOwner={false}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')

  await user.click(button)

  const elementLikes = screen.getByText('likes 3')
  const elementUrl = screen.getByText('osoite@osoite.osoite')
  const elementUser = screen.getByText('Oskari')

  expect(elementLikes).toBeDefined()
  expect(elementUrl).toBeDefined()
  expect(elementUser).toBeDefined()
})

test('like Blog', async() => {
  const blog = {
    title: 'Kuinka testataan react',
    author: 'Kisu Miau',
    likes: 3,
    url: 'osoite@osoite.osoite',
    user: {
      name: 'Oskari'
    }
  }

  const removeBlog = () => (<></>)

  const mockHandler = jest.fn()

  render(<Blog blog={blog} newBlogLike={mockHandler} removeBlog={removeBlog} isOwner={false}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')

  await user.click(button)

  const likeButton = screen.getByText('like')

  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls.length).toBe(2)
})