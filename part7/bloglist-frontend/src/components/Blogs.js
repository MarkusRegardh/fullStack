import React from "react"
import { Table } from "react-bootstrap"
import { useRef, useContext } from "react"
import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import { Link } from "react-router-dom"
import NotificationContext from "../NotificationContext"
import { useMutation, useQueryClient } from "react-query"
import blogService from "../services/blogs"

const Blogs = ({ result }) => {
  // eslint-disable-next-line no-unused-vars
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const createBlogMutation = useMutation(blogService.create, {
    onSuccess: (content) => {
      queryClient.invalidateQueries("blogs")
      notificationDispatch({
        type: "SET",
        payload: { message: `Added ${content.title}`, color: "green" },
      })
      setTimeout(() => {
        notificationDispatch({ type: "UNSET" })
      }, 5000)
    },
    onError: () => {
      notificationDispatch({
        type: "SET",
        payload: { message: `Creation failed`, color: "red" },
      })
      setTimeout(() => {
        notificationDispatch({ type: "UNSET" })
      }, 5000)
    },
  })

  const blogFormRef = useRef()

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>Blog service not available due to problems in server</div>
  }
  const blogs = result.data

  const addBlog = (blogObject) => {
    createBlogMutation.mutate(blogObject)
  }

  return (
    <>
      <h2>Blogs</h2>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      <Table striped>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>{blog.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Blogs
