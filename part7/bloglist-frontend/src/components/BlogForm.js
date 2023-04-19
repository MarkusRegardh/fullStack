import { useState } from "react"
import React from "react"
import PropTypes from "prop-types"
import { Form, Button } from "react-bootstrap"

const BlogForm = ({ addBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState("")
  const [newBlogAuthor, setNewBlogAuthor] = useState("")
  const [newBlogURL, setNewBlogURL] = useState("")

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
      url: newBlogURL,
    })
    setNewBlogAuthor("")
    setNewBlogTitle("")
    setNewBlogURL("")
  }

  return (
    <>
      <Form onSubmit={newNote}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            id="title"
            value={newBlogTitle}
            onChange={handleTitleChange}
          />
          <Form.Label>Author</Form.Label>
          <Form.Control
            id="author"
            value={newBlogAuthor}
            onChange={handleAuthorChange}
          />
          <Form.Label>URL</Form.Label>
          <Form.Control
            id="url"
            value={newBlogURL}
            onChange={handleURLChange}
          />

          <Button variant="primary" id="submitBlog" type="submit">
            save
          </Button>
        </Form.Group>
      </Form>
    </>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default BlogForm
