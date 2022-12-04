describe('Testing PV', () => {
  beforeEach(() => {
    cy.visit('https://computer-database.gatling.io/computers')
  })

  function createDate(){
    let year = new Date().getFullYear().toString()
    let mounh = ("0" + new Date().getMonth()).slice(-2)
    let day = ("0" + new Date().getDate()).slice(-2)
    let dateToday = year + '-' + mounh + '-' + day

    return dateToday
  }

  it('Pesquisa por Macbook', () => {
    cy.get('#searchbox').type('Macbook')
    cy.get('#searchsubmit').click()
    cy.get('tbody > :nth-child(1) > :nth-child(1) ').should('contain.text','MacBook')
    cy.get('tbody > :nth-child(1) > :nth-child(2)').should('contain.text','16 May 2006')
    cy.get('tbody > :nth-child(1) > :nth-child(4)').should('contain.text','Apple Inc.')
  })

  it('Inserir novo computador', () => {
    cy.get('#add').click()
    cy.get('#main > h1').should('contain.text','Add a computer')
    cy.get('#name').type('Computer Name')
    cy.get('#introduced').type(createDate())
    cy.get('.primary').click()
    cy.get('.alert-message').should('contain.text','Computer Computer Name has been created')
  })

  it('Inserir novo computador sem preencher formulario', () => {
    cy.get('#add').click()
    cy.get('#main > h1').should('contain.text','Add a computer')
    cy.get('.primary').click()
    cy.get('.error > .input > .help-inline').should('contain.text','Predicate isEmpty() did not fail')
  })
  
  it('Checar exibição de proxima página', () => {
    cy.get('.next > a').click()
    cy.get('.current > a').should('contain.text','Displaying 11 to 20 of 574')
  })
})