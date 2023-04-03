import { useState } from 'react'
import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  addBlog
}) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogURL, setNewBlogURL] = useState('')

  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }


  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleURLChange = (event) => {
    setNewBlogURL(event.target.value)
  }

  const newNote = (event) => {
    event.preventDefault()
    addBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogURL
    })
    setNewBlogAuthor('')
    setNewBlogTitle('')
    setNewBlogURL('')
  }


  return (
    <>
      <form onSubmit={newNote}>
        <label>
      Title
          <input
            id='title'
            value={newBlogTitle}
            onChange={handleTitleChange}
          />
        </label>
        <br/>
        <label>
      Author
          <input
            id='author'
            value={newBlogAuthor}
            onChange={handleAuthorChange}
          />
        </label>
        <br/>
        <label>
      URL
          <input
            id='url'
            value={newBlogURL}
            onChange={handleURLChange}
          />
        </label>
        <br/>
        <button id='submitBlog' type="submit">save</button>
      </form>


    </>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogForm