import { useState } from "react"

const Blog = ({blog}) =>  {
  const [viewVisible, setViewVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const viewAll = () => (
    <>
    <p>{blog.title} {blog.author}<button onClick={() => setViewVisible(false)}>hide</button></p>
    <p>{blog.url}</p>
    <p>likes {blog.likes} <button>like</button></p>
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
}

export default Blog