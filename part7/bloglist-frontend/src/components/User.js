import React from "react"
import { useParams } from "react-router-dom"

const User = ({ queryResult }) => {
  if (queryResult.isLoading) {
    return <div>loading data...</div>
  }

  if (queryResult.isError) {
    return <div>Blog service not available due to problems in server</div>
  }
  const users = queryResult.data
  const id = useParams().id
  const user = users.find((e) => e.id === id)
  if (!user) {
    return (
      <>
        <p>User not found</p>
      </>
    )
  }
  return (
    <>
      <h2>{user.name}</h2>
      <b>Added blogs</b>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}> {blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User
