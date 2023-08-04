describe('Testes para o App', () => {
  it('Deve carregar o App', () => {
    cy.visit('http://localhost:4200')
    cy.get('#containerList')
  .find('#listContainer')

  .should(($div) => {
    expect($div).to.have.length(1)

    const className = $div[0].className
  })
})
  it('Checar "Conjunto"', () => {
    cy.visit('http://localhost:4200')
    cy.get('#containerList')
    .find('H3').contains('Conjunto')
  })

  it('Verificar se todos items estão preenchidos e se são string.', () => {
    cy.visit('http://localhost:4200')
    cy.get('#listContainer li').each(($item) => {
      cy.wrap($item).should('contain.text', 'ID: ');
      cy.wrap($item).should('contain.text', 'Descrição: ');
      cy.wrap($item).should('contain.text', 'Data Máxima: ');
      cy.wrap($item).should('contain.text', 'Tempo Estimado: ');

      const id = $item.find('[id^="jobId"]').text().replace('ID: ', '');
      const descricao = $item.find('[id^="jobDescricao"]').text().replace('Descrição: ', '');
      const dataMaxima = $item.find('[id^="jobDataMaxima"]').text().replace('Data Máxima: ', '');
      const tempoEstimado = $item.find('[id^="jobTempoEstimado"]').text().replace('Tempo Estimado: ', '');

      expect(id).to.be.a('string');
      expect(descricao).to.be.a('string');
      expect(dataMaxima).to.be.a('string');
      expect(tempoEstimado).to.be.a('string');
    })
})});

