const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (!username && !password){
    return response.status(400).json({
        error: 'username and/or password missing'
    }).end()
  }
  if (username.length < 3 || password.length < 3){
    return response.status(400).json({
        error: 'username and password must be atleast 3 characters long'
    }).end()
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const result = await User.find({}).populate('blogs', { title: 1, likes: 1})
    response.json(result)
})

module.exports = usersRouter