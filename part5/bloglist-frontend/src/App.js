import { useState, useEffect, useRef } from 'react'
import React from 'react'
import loginService from './services/login'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Error from './components/Error'
import Success from './components/Success'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [success, setSuccess]= useState(null)
  const [error, setError]= useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a,b) => b.likes - a.likes)
      setBlogs( blogs )
    }
    )
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccess('Logged in')
      setTimeout(() => {
        setSuccess(null)
      }, 3000)
    } catch (exception) {
      setError('Login failed')
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }

  const incrementLikes = (blog) => {
    blog.likes += 1
    blogService.update(blog).then(() => {
      blogs.sort((a,b) => b.likes - a.likes)
      setBlogs( blogs )
      setSuccess('Liked')
      setTimeout(() => {
        setSuccess(null)
      }, 3000)
    }
    ).catch((error) => {
      setError(`${error}`)
      setTimeout(() => {
        setError(null)
      }, 3000)
    })
  }

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((res) => {
      setBlogs(blogs.concat(res))
      blogFormRef.current.toggleVisibility()
      setSuccess(`${res.title} added`)
      setTimeout(() => {
        setSuccess(null)
      }, 3000)
    }).catch((error) => {
      setError(`${error}`)
      setTimeout(() => {
        setError(null)
      }, 3000)
    })
  }

  const deleteBlog = (blog) => {
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (confirm){
      blogService.remove(blog.id).then(() => {
        setBlogs(blogs.filter((obj) => {
          return obj.id !== blog.id
        }))
        setSuccess('Deleted')
        setTimeout(() => {
          setSuccess(null)
        }, 3000)
      }).catch((error) => {
        setError(`${error}`)
        setTimeout(() => {
          setError(null)
        }, 3000)
      })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    blogService.setToken(null)
    setSuccess('Logged out')
    setTimeout(() => {
      setSuccess(null)
    }, 3000)
  }




  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
      username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
      password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>

  )

  if (user === null) {
    return <div>
      <Success message={success}/>
      <Error message={error}/>
      {loginForm()}
    </div>
  }

  return (

    <div>
      <Success message={success}/>
      <Error message={error}/>
      <h2>blogs</h2>
      <p>Logged in as: {user.name}</p>
      <Togglable buttonLabel="New Blog" ref={blogFormRef} >
        <BlogForm
          addBlog = {addBlog}

        />
      </Togglable>
      <button id='logout' onClick={handleLogout}>logout </button>
      {blogs.map(blog =>
        <Blog className='blog' key={blog.id} blog={blog} incrementLikes={incrementLikes} user={user} deleteBlog={deleteBlog} />
      )}
    </div>
  )

}

export default App