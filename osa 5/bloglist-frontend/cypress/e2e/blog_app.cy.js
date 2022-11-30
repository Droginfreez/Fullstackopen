const frontendUrl = 'http://localhost:3000'
const resetUrl = 'http://localhost:3003/api/testing/reset'
const userUrl = 'http://localhost:3003/api/users/'
const loginUrl = 'http://localhost:3003/api/login/'
const user = {name: 'root', username: 'root', password: 'root'}

                //all tests are to be ran back to back in a single run

describe('e2e testing', function() {
  beforeEach(function() {
    cy.request('POST', resetUrl)
    cy.request('POST', userUrl, user)
    cy.visit(frontendUrl)
  })

  it('Login form is shown', function() {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
    cy.get('#username')
    cy.get('#password')
    cy.contains('login')
  })

  it('login works', function() {
    cy.contains('login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('root')
    cy.get('#loginButton').click()
    cy.contains('root logged in')
  })
})

describe('while logged in', function() {
  it('blogs can be added', function() {
    cy.contains('Add new blog').click()
    cy.get('#title').type('test1')
    cy.get('#author').type('test2')
    cy.get('#url').type('toBeDeleted')
    cy.contains('add').click()
    cy.contains('test1 by test2')
  })

  it('blogs can be liked', function () {
    cy.contains('test1')
    cy.contains('view').click()
    cy.get('.likeButton').click()
    cy.get('.likes').contains('1')
  })

  it('blog can be deleted by creator', function () {
    cy.contains('test1')
    cy.contains('remove').click()
  })

  describe('while multiple blogs have been created', function() {
    beforeEach(function() {
      cy.request('POST', loginUrl, {username: user.username, password: user.password})
        .then(({body}) => {
          localStorage.setItem('loggedUser', JSON.stringify(body))
          cy.visit(frontendUrl)
        }) 
        cy.wait(1500)

      cy.createBlog({
        title: '6 likes',
        author: 'Test 1',
        url: 'test',
        likes: 6
      })
      cy.createBlog({
        title: '9 likes',
        author: 'Test 2',
        url: 'test',
        likes: 9
      })
      cy.createBlog({
        title: '3 likes',
        author: 'Test 3',
        url: 'test',
        likes: 3
      })
    })

    it('blogs are sorted by likes', function () {
      cy.get('.blog>.title').should((items) => {
        expect(items[0]).to.contain('9 likes')
        expect(items[1]).to.contain('6 likes')
        expect(items[2]).to.contain('3 like')
      })
    })
  })
})