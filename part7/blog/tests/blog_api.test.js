const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const test_helper = require('./test_helper')

const api = supertest(app)


  beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of test_helper.initialBlogs){
        const blogObject = new Blog(blog)
        await blogObject.save()
    }
  })

  describe('Unauthenticated ', () => {
test('blogs have correct length', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(test_helper.initialBlogs.length)
})

test('blogs have the property id', async () => {
    const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    response.body.forEach( element => {
        expect(element.id).toBeDefined()
})
})
  })


  describe('With authentication', () => {



test('user does not get added with password and or username too short', async() => {

    const before = await api.get('/api/users')

    let newUser = {
        username: "ab",
        name: "test",
        password: "1234"
    }

    await api.post('/api/users').send(newUser).expect(400)

    newUser.username = "abcd"
    newUser.password = "12"

    await api.post('/api/users').send(newUser).expect(400)

    const after = await api.get('/api/users')

    expect(after.body).toHaveLength(before.body.length )
})

test('user gets added with correct body', async() => {

    const before = await api.get('/api/users')

    let newUser = {
        username: "test",
        name: "test",
        password: "1234"
    }

    await api.post('/api/users').send(newUser).expect(201)

    newUser.username = "test2"
    newUser.password = "4321"

    await api.post('/api/users').send(newUser).expect(201)

    const after = await api.get('/api/users')

    expect(after.body).toHaveLength(before.body.length +2 )
})

test('you can login to the users', async() => {
    const user = {
        username: "test",
        password: "1234"
    }

    const res = await api.post('/api/login').send(user).expect(200)
    expect(res.body.token).toBeDefined()
})

test('login fails with wrong credentials', async() => {
    const user = {
        username: "test5",
        password: "121134"
    }

    const res = await api.post('/api/login').send(user).expect(401)
    expect(res.body.token).not.toBeDefined()
})

test('blogs get added when  logged in', async () => {

    const user = {
        username: "test",
        password: "1234"
    }

    const res = await api.post('/api/login').send(user).expect(200)
    const auth = `Bearer ${res.body.token}`

    const before = await api.get('/api/blogs')

    const newBlog = {
        title: "test",
        author: "teppo testi",
        likes: 1,
        url: "test.com"
    }
    
    await api.post('/api/blogs').set({'Authorization': `${auth}`}).send(newBlog).expect(201).expect('Content-Type', /application\/json/)

    const after = await api.get('/api/blogs')

    expect(after.body).toHaveLength(before.body.length + 1)
})
test('blog post requests without likes get defaulted to 0', async () => {
    
    const user = {
        username: "test",
        password: "1234"
    }

    const res = await api.post('/api/login').send(user).expect(200)
    const auth = `Bearer ${res.body.token}`

    const newBlog = {
        title: "test2",
        author: "testiTeppo",
        url: "test.fi"
    }

    const response = await api.post('/api/blogs').set({'Authorization': `${auth}`}).send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    expect(response.body.likes).toBe(0)

})

test('blog without title and/or url respond with 400', async () => {
     const user = {
        username: "test",
        password: "1234"
    }

    const res = await api.post('/api/login').send(user).expect(200)
    const auth = `Bearer ${res.body.token}`

    let newBlog = {
        title: "testBad",
        author: "test",
        likes: 1
    }

    await api.post('/api/blogs').set({'Authorization': `${auth}`}).send(newBlog).expect(400)

    newBlog = {
        author: "anothertest",
        url: "www.fi",
        likes: 2
    }
    
    await api.post('/api/blogs').set({'Authorization': `${auth}`}).send(newBlog).expect(400)
})

test('Unauthenticated requests to add a blog fails', async () => {
    
    const before = await api.get('/api/blogs')
    const newBlog = {
        title: "test",
        author: "teppo testi",
        likes: 1,
        url: "test.com"
    }

   await api.post('/api/blogs').send(newBlog).expect(401)
   const after = await api.get('/api/blogs')

    expect(after.body).toHaveLength(before.body.length )
   
})



test('blog can be removed', async () => {
    const user = {
        username: "test",
        password: "1234"
    }

    const res = await api.post('/api/login').send(user).expect(200)
    const auth = `Bearer ${res.body.token}`

    const before = await api.get('/api/blogs')

    const newBlog = {
        title: "test",
        author: "teppo testi",
        likes: 1,
        url: "test.com"
    }
    
    let blog = await api.post('/api/blogs').set({'Authorization': `${auth}`}).send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    blog = blog.body
    const after = await api.get('/api/blogs')

    expect(after.body).toHaveLength(before.body.length + 1)
    await api.delete(`/api/blogs/${blog.id}`).set({'Authorization': `${auth}`}).expect(204)

    const blogsAfter = await api.get('/api/blogs')

    expect(blogsAfter.body).toHaveLength(before.body.length)
    expect(blogsAfter.body).not.toContainEqual(blog)
})

test('blog can be updated', async () => {
    const blogs = await api.get('/api/blogs')
    const blog = blogs.body[0]
    const updatedBlog = {
        author: "updatedTeppo",
        likes: 100,
    }

    await api.put(`/api/blogs/${blog.id}`).send(updatedBlog).expect(200)

    const blogsAfter = await api.get('/api/blogs')

    expect(blogsAfter.body).not.toContainEqual(blog)

    expect(blogsAfter.body[0].likes).toBe(100)

    expect(blogsAfter.body[0].title).toBe(blog.title)

})

  })


afterAll(async () => {
  await mongoose.connection.close()
})