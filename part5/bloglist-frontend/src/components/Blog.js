import { useState } from 'react'
import PropTypes from 'prop-types'
import React from 'react'
const Blog = ({ blog, incrementLikes, user ,deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = () => {
    incrementLikes(blog)
  }

  const remove = () => {
    deleteBlog(blog)
  }

  if (visible){
    return (
      <div style={blogStyle} className='blog'>
        <div>
          {blog.title} {blog.author}
          <br/>
          {blog.url}
          <br/>
          {blog.likes}
          <br/>
          {blog.user.name}
          <br/>
          <button id='like'onClick={like}> Like </button>
          <br/>
          {blog.user.name === user.name && (
            <button id='delete' onClick={remove}> Delete</button>
          )}
          <br/>
          <button id='hide' onClick={toggleVisibility}> hide </button>
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author}
        <button id='view' onClick={toggleVisibility}> view </button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog:PropTypes.object.isRequired,
  incrementLikes: PropTypes.func,
  user: PropTypes.object,
  deleteBlog: PropTypes.func,
}

export default Blog