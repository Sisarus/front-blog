import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
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