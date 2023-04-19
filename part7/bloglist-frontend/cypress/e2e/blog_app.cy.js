describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: "test",
      password: "1234",
      name: "Teppo Testi"
  }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })
  
  describe('Login', function() {
  it('succeeds with correct credentials', function () {
    cy.get('#username').type('test')
    cy.get('#password').type('1234')
    cy.get('#login-button').click()

    cy.contains('Teppo Testi')
    cy.contains('blogs')

  })

  it('fails with wrong credentials', function () {
    cy.get('#username').type('tset')
    cy.get('#password').type('4321')
    cy.get('#login-button').click()

    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.get('.error').contains('Login failed')
    cy.should('not.contain','Teppo Testi')
  })
})
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('test')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#showForm').click()
      cy.get('#title').type('How to cypress')
      cy.get('#author').type('Mikko Ministeri')
      cy.get('#url').type('www.test.com')
      cy.get('#submitBlog').click()
      cy.contains('How to cypress')
    })
  
    describe('With a blog added', function() {
      beforeEach(function() {
      cy.get('#showForm').click()
      cy.get('#title').type('How to cypress')
      cy.get('#author').type('Mikko Ministeri')
      cy.get('#url').type('www.test.com')
      cy.get('#submitBlog').click()
    })
    it('A blog can be liked', function() {
      cy.get('#view').click()
      cy.get('#like').click()
      cy.contains('1')
      cy.get('#like').click()
      cy.contains('2')
    })

    it('Logged in user can delete the blog', function() {
      cy.get('#view').click()
      cy.get('#delete').click()
      cy.should('not.contain','How to cypress')
    })

    it('Another user can not see the delete button', function () {
      const anotherUser = {
        username: "test2",
        password: "5555",
        name: "Aku Ankka"
    }
      cy.request('POST', 'http://localhost:3003/api/users/', anotherUser)
      cy.get('#logout').click()
      cy.get('#username').type('test2')
      cy.get('#password').type('5555')
      cy.get('#login-button').click()
      cy.get('#view').click()
      cy.get('button').contains('delete').should('not.exist')
    })
  })
    it('Blogs get ordered correctly', function() {
      cy.get('#showForm').click()
      cy.get('#title').type('3rd')
      cy.get('#author').type('Mikko Ministeri')
      cy.get('#url').type('www.test.com')
      cy.get('#submitBlog').click()
      cy.get('#showForm').click()
      cy.get('#title').type('1st')
      cy.get('#author').type('Mikko Ministeri')
      cy.get('#url').type('www.test.com')
      cy.get('#submitBlog').click()
      cy.get('#showForm').click()
      cy.get('#title').type('2nd')
      cy.get('#author').type('Mikko Ministeri')
      cy.get('#url').type('www.test.com')
      cy.get('#submitBlog').click()
      cy.contains('3rd').get('#view').click()
      cy.contains('2nd').get('#view').click()
      cy.contains('1st').get('#view').click()
      cy.contains('3rd').parent().contains('Like').click()
      cy.contains('3rd').contains(1)
      cy.contains('2nd').parent().contains('Like').click()
      cy.contains('2nd').contains(1)
      cy.contains('2nd').parent().contains('Like').click()
      cy.contains('2nd').contains(2)
      cy.contains('1st').parent().contains('Like').click()
      cy.contains('1st').contains(1)
      cy.contains('1st').parent().contains('Like').click()
      cy.contains('1st').contains(2)
      cy.contains('1st').parent().contains('Like').click()
      cy.contains('1st').contains(3)
      cy.contains('1st').parent().contains('Like').click()
      cy.contains('1st').contains(4)
      cy.get('.blog').eq(0).should('contain', '1st')
      cy.get('.blog').eq(1).should('contain', '2nd')
      cy.get('.blog').eq(2).should('contain', '3rd')
    })

})
})