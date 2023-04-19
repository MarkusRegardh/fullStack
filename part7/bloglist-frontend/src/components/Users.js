import React from "react"
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"
const Users = ({ queryResult }) => {
  // eslint-disable-next-line no-unused-vars

  if (queryResult.isLoading) {
    return <div>loading data...</div>
  }

  if (queryResult.isError) {
    return <div>Blog service not available due to problems in server</div>
  }
  const users = queryResult.data
  return (
    <>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <td></td>
            <td>
              <b>blogs created</b>
            </td>
          </tr>
        </thead>
        {users.map((user) => (
          <tbody key={user.id}>
            <tr>
              <td>
                <Link to={`/users/${user.id}`}>{user.name} </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          </tbody>
        ))}
      </Table>
    </>
  )
}

export default Users
