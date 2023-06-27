import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage(exception.response.data['error'])
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleaAddBlog = async (event) => {
    event.preventDefault()
    const newObject =  {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      const blog = await blogService.create(newObject)
      console.log(blog)

      setBlogs(blogs.concat(blog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setSuccessMessage(`${blog.title} by ${blog.author}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
    }
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser()
  }

  const loginForm = () => (
    <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} type="error" />
          <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form> 
      </div>
  )

  const blogList = () => (
    <div>
    <h2>blogs</h2>
    <Notification message={successMessage} type="success"/>
    <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>

    {blogForm()}

    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
  )

  const blogForm = () => (
    <form onSubmit={handleaAddBlog}>
    <div>
    Title:
      <input
      type="text"
      name="title"
        value={newTitle}
        onChange={handleTitleChange}
      />
      </div>
      <div>
      Author:
      <input
      type="text"
      name="author"
        value={newAuthor}
        onChange={handleAuthorChange}
      />
      </div>
      <div>
      Url:
      <input
      type="text"
      name="url"
        value={newUrl}
        onChange={handleUrlChange}
      />
      </div>
      <button type="submit">save</button>
    </form>  
  )

    return (
      <div>
        {!user && loginForm()}
        {user && blogList()}
      </div>
    )
  
}

export default App