import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Blog = forwardRef(({ blog, newBlogLike, removeBlog, isOwner }, ref) =>  {
  const [viewVisible, setViewVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = () => {setLikes(likes + 1)}

  useImperativeHandle(ref, () => {
    return {
      addLike
    }
  })

  const likeBlog = (event) => {
    event.preventDefault()
    const newLikes = likes + 1

    newBlogLike({
      id: blog.id,
      data: {
        user: blog.user.id,
        likes: newLikes,
        title: blog.title,
        author: blog.author,
        url: blog.url
      }

    })
  }

  const RemoveBlog = (event) => {
    event.preventDefault()

    const confirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)

    if (confirmed) {
      removeBlog({ id: blog.id })
    }
  }

  const viewAll = () => (
    <>
      <p>{blog.title} {blog.author}<button onClick={() => setViewVisible(false)}>hide</button></p>
      <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
      <p>likes {likes} <button onClick={likeBlog}>like</button></p>
      <p>{blog.user.name}</p>
      {isOwner && (
        <button onClick={RemoveBlog}>Remove</button>
      )}
    </>
  )

  const viewLine = () => (
    <>
      <p>{blog.title} {blog.author}<button onClick={() => setViewVisible(true)}>view</button></p>
    </>
  )

  return (
    <div style={blogStyle}>
      {!viewVisible && viewLine()}
      {viewVisible && viewAll()}
    </div>
  )
})

Blog.displayName = 'Blog'

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  newBlogLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  isOwner: PropTypes.bool.isRequired
}

export default Blog