import { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlog = ({ addNewBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const AddBlog = (event) => {
    event.preventDefault()
    addNewBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={AddBlog}>
        <div>
          Title:
          <input
            type="text"
            name="title"
            value={newTitle}
            onChange={event => setNewTitle(event.target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            name="author"
            value={newAuthor}
            onChange={event => setNewAuthor(event.target.value)}
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            name="url"
            value={newUrl}
            onChange={event => setNewUrl(event.target.value)}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

NewBlog.displayName = 'NewBlog'

NewBlog.propTypes = {
  addNewBlog: PropTypes.func.isRequired
}

export default NewBlog