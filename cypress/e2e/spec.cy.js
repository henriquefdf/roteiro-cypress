describe('template spec', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('http://127.0.0.1:7001/')
  })

  it('Insere uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li .destroy')
      .invoke('show')
      .click();

    cy.get('.todo-list li')
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.contains('Active').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.contains('Completed').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.contains('All').click();
    cy.get('.todo-list li')
      .should('have.length', 2);
  });
/*----------Novos testes----------*/

  it('Edita uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de ES{enter}');

    cy.get('.todo-list li label')
      .dblclick();

    cy.get('.edit')
      .type(' sobre testes e2e{enter}');

    cy.get('.todo-list li')
      .should('have.text', 'TP2 de ES sobre testes e2e');
  });

  it('Cancela edição de uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de ES{enter}');

    cy.get('.todo-list li label')
      .dblclick();

    cy.get('.edit')
      .type(' de Engenharia de Software')
      .type('{esc}')

    cy.get('.todo-list li')
      .should('have.text', 'TP2 de ES');
  });

  it('Marca todas as tarefas como completas', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

      cy.get('.todo-list li .toggle')
      .each(($el) => {
        cy.wrap($el).click();
      });

    cy.get('.todo-list li')
      .should('have.length', 2)
      .each(($el) => {
        cy.wrap($el).should('have.class', 'completed');
      });
  });

  it('Desmarca todas as tarefas', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('.todo-list li .toggle')
      .each(($el) => {
        cy.wrap($el).click();
      });

    cy.get('.todo-list li .toggle')
      .each(($el) => {
        cy.wrap($el).click();
      });

    cy.get('.todo-list li')
      .should('have.length', 2)
      .each(($el) => {
        cy.wrap($el).should('not.have.class', 'completed');
      });
  });

});