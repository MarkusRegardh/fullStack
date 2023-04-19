import PropTypes from "prop-types"
import React from "react"
import { useState } from "react"
import { Button } from "react-bootstrap"
import { useParams } from "react-router-dom"
const Blog = ({
  queryResult,
  incrementLikes,
  user,
  deleteBlog,
  postComment,
}) => {
  const [newComment, setComment] = useState("")
  const id = useParams().id
  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  if (queryResult.isLoading) {
    return <div>loading data...</div>
  }

  if (queryResult.isError) {
    return <div>Blog service not available due to problems in server</div>
  }
  const blogs = queryResult.data

  const blog = blogs.find((e) => e.id === id)

  if (!blog) {
    return (
      <>
        <p>No blog found</p>
      </>
    )
  }
  const addComment = (event) => {
    event.preventDefault()
    postComment(blog, newComment)
    setComment("")
  }
  const like = () => {
    incrementLikes(blog)
  }

  const remove = () => {
    deleteBlog(blog)
  }
  return (
    <div className="blog">
      <div>
        <h2>
          {blog.title} {blog.author}
        </h2>
        <br />
        <a href={blog.url}>{blog.url}</a>
        <br />
        {blog.likes} likes
        <Button variant="success" id="like" onClick={like}>
          {" "}
          Like{" "}
        </Button>
        <br />
        added by {blog.user.name}
        <br />
        {blog.user.name === user.name && (
          <Button variant="danger" id="delete" onClick={remove}>
            {" "}
            Delete
          </Button>
        )}
        <br />
        <h4>comments</h4>
        <form onSubmit={addComment}>
          <input id="title" value={newComment} onChange={handleCommentChange} />
          <Button id="submitBlog" type="submit">
            Add comment
          </Button>
        </form>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>
              <p>{comment.comment} </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

Blog.propTypes = {
  incrementLikes: PropTypes.func,
  user: PropTypes.object,
  deleteBlog: PropTypes.func,
}

export default Blog
