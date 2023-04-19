import { useState, useEffect } from "react"
import React from "react"
import loginService from "./services/login"
import blogService from "./services/blogs"
import Menu from "./components/Menu"
import { Routes, Route } from "react-router-dom"
import Users from "./components/Users"
import User from "./components/User"
import Blogs from "./components/Blogs"
import Blog from "./components/Blog"
import { useContext } from "react"
import NotificationContext from "./NotificationContext"
import UserContext from "./UserContext"
import userService from "./services/users"
import Notification from "./components/Notification"
import { Form, Button } from "react-bootstrap"
// eslint-disable-next-line no-unused-vars
import { useQuery, useMutation, useQueryClient } from "react-query"

const App = () => {
  const [user, userDispatch] = useContext(UserContext)
  //const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  // eslint-disable-next-line no-unused-vars
  const [notification, notificationDispatch] = useContext(NotificationContext)
  // eslint-disable-next-line no-unused-vars
  const queryClient = useQueryClient()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({
        type: "SET",
        payload: user,
      })
      blogService.setToken(user.token)
    }
  }, [])

  const usersResult = useQuery("users", userService.getAll)

  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: (content) => {
      queryClient.invalidateQueries("blogs")
      notificationDispatch({
        type: "SET",
        payload: { message: `Liked ${content.title}`, color: "green" },
      })
      setTimeout(() => {
        notificationDispatch({ type: "UNSET" })
      }, 5000)
    },
    onError: () => {
      notificationDispatch({
        type: "SET",
        payload: { message: `Like failed`, color: "red" },
      })
      setTimeout(() => {
        notificationDispatch({ type: "UNSET" })
      }, 5000)
    },
  })

  const commentMutation = useMutation(blogService.comment, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs")
      notificationDispatch({
        type: "SET",
        payload: { message: `Commented`, color: "green" },
      })
      setTimeout(() => {
        notificationDispatch({ type: "UNSET" })
      }, 5000)
    },
    onError: () => {
      notificationDispatch({
        type: "SET",
        payload: { message: `Comment failed`, color: "red" },
      })
      setTimeout(() => {
        notificationDispatch({ type: "UNSET" })
      }, 5000)
    },
  })

  const deleteBlogMutation = useMutation(blogService.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs")
      notificationDispatch({
        type: "SET",
        payload: { message: `Removed blog`, color: "green" },
      })
      setTimeout(() => {
        notificationDispatch({ type: "UNSET" })
      }, 5000)
    },
    onError: () => {
      notificationDispatch({
        type: "SET",
        payload: { message: `Remove failed`, color: "red" },
      })
      setTimeout(() => {
        notificationDispatch({ type: "UNSET" })
      }, 5000)
    },
  })

  const blogsResult = useQuery("blogs", blogService.getAll)

  const incrementLikes = (blog) => {
    blog.likes += 1
    updateBlogMutation.mutate(blog)
  }

  const postComment = (blog, comment) => {
    const body = {
      blog: blog.id,
      comment: comment,
    }
    commentMutation.mutate(body)
  }

  const deleteBlog = (blog) => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )
    if (confirm) {
      deleteBlogMutation.mutate(blog)
    }
    return
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({
        type: "SET",
        payload: user,
      })
      setUsername("")
      setPassword("")
      notificationDispatch({
        type: "SET",
        payload: { message: `Logged in as ${user.name}`, color: "green" },
      })
      setTimeout(() => {
        notificationDispatch({ type: "UNSET" })
      }, 5000)
    } catch (exception) {
      notificationDispatch({
        type: "SET",
        payload: { message: `Login failed`, color: "red" },
      })
      setTimeout(() => {
        notificationDispatch({ type: "UNSET" })
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser")
    userDispatch({
      type: "UNSET",
    })
    blogService.setToken(null)
    notificationDispatch({
      type: "SET",
      payload: { message: `Logged out`, color: "green" },
    })
    setTimeout(() => {
      notificationDispatch({ type: "UNSET" })
    }, 5000)
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant="warning" id="login-Button" type="submit">
          login
        </Button>
      </Form>
    </div>
  )

  if (user === null) {
    return (
      <div>
        <Notification />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <Menu user={user} handleLogout={handleLogout} />
      <Notification />
      <Routes>
        <Route
          path="/"
          element={<Blogs user={user} result={blogsResult} />}
        ></Route>
        <Route
          path="/users"
          element={<Users queryResult={usersResult} />}
        ></Route>
        <Route
          path="/users/:id"
          element={<User queryResult={usersResult} />}
        ></Route>
        <Route
          path="/blogs/:id"
          element={
            <Blog
              queryResult={blogsResult}
              incrementLikes={incrementLikes}
              user={user}
              deleteBlog={deleteBlog}
              postComment={postComment}
            />
          }
        ></Route>
      </Routes>
    </div>
  )
}

export default App
