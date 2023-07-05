import { useState, useImperativeHandle, forwardRef } from 'react'

const Blog = forwardRef(({blog, newBlogLike}, ref) =>  {
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

  const AddBlog = (event) => {
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


  const viewAll = () => (
    <>
    <p>{blog.title} {blog.author}<button onClick={() => setViewVisible(false)}>hide</button></p>
    <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
    <p>likes {likes} <button onClick={AddBlog}>like</button></p>
    <p>{blog.user.name}</p>
    </>  
  )

  const viewLine = () =>(
    <p>{blog.title} {blog.author}<button onClick={() => setViewVisible(true)}>view</button></p>
  )

  return (
    <div style={blogStyle}>
        {!viewVisible && viewLine()}
        {viewVisible && viewAll()}
  </div>  
  )
})

export default Blog