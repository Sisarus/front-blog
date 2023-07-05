import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const blogLikeRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
        const sortedBlogs =  blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(sortedBlogs)
      } catch (error) {
        console.error('Error while fetching blogs', error);
      }
    }
    
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log('user.id '  + JSON.stringify(user) )
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

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    const blog = await blogService.create(newBlog)
    
    setBlogs(blogs.concat(blog))

    setSuccessMessage(`${blog.title} by ${blog.author}`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const removeBlog = async (removeBlog) => {
    try {
      await blogService.remove(removeBlog)
      const filteredBlog = blogs.filter((blog)=> blog.id !== removeBlog.id)
      setBlogs(filteredBlog)
    } catch (exception) {
    setErrorMessage(exception.response.data['error'])
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser()
  }

  const newBlogLike = async (oldBlog) => {
    try {
      await blogService.put(oldBlog)
      blogLikeRef.current.addLike()
    } catch (exception) {
      setErrorMessage(exception.response.data['error'])
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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

    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <NewBlog addNewBlog={addBlog}/>
    </Togglable>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} newBlogLike={newBlogLike} removeBlog={removeBlog} isOwner={user.username === blog.user.username} ref={blogLikeRef}/>
    )}
  </div>
  )

    return (
      <div>
        {!user && loginForm()}
        {user && blogList()}
      </div>
    )
  
}

export default App