import { setCookie, deleteCookie } from '../../src/utils/cookie';
describe('test products, constructor and modals', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'get_ingredients.json'
    });
    cy.viewport(1500, 800);
    cy.visit('http://localhost:4000/');
  });

  it('add bun to cunstructor', () => {
    cy.get('[data-cy=ingredient_1]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1] ')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Краторная булка N-200i')
      .should('exist');
  });
  it('add ingredients to cunstructor', () => {
    cy.get('[data-cy=ingredient_2]').contains('Добавить').click();
    cy.get('[data-cy=ingredient_4]').contains('Добавить').click();
    cy.get('[data-cy=constructor-ingredients] ')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Соус Spicy-X')
      .should('exist');
  });
  it('open modal and close using the button', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.get('[data-cy=true]').contains('Краторная булка N-200i');
    cy.get('[data-cy=true]  button ').click();
    cy.get('[data-cy=true]').should('not.exist');
  });
  it('open modal and close using overlay', () => {
    cy.contains('Биокотлета из марсианской Магнолии').click();
    cy.get('[data-cy=true]').contains('Биокотлета из марсианской Магнолии');
    cy.get('[data-cy=overlay]').click('left', { force: true });
    cy.get('[data-cy=true]').should('not.exist');
  });
});
describe('test order', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'get_ingredients.json'
    });
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'get_user.json'
    });
    cy.intercept('POST', 'api/orders', {
      fixture: 'post_order.json'
    });
    window.localStorage.setItem('refreshToken', JSON.stringify('allow'));
    setCookie('accessToken', 'allow');
    cy.viewport(1500, 800);
    cy.visit('http://localhost:4000/');
  });
  it('order burger', () => {
    cy.get('[data-cy=ingredient_3]').contains('Добавить').click();
    cy.get('[data-cy=ingredient_4]').contains('Добавить').click();
    cy.get('[data-cy=ingredient_5]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1] ')
      .contains('Флюоресцентная булка R2-D3')
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Флюоресцентная булка R2-D3')
      .should('exist');
    cy.get('[data-cy=post_order]').click();
    cy.get('[data-cy=true]').contains('123456');
    cy.get('[data-cy=true]  button ').click();
    cy.get('[data-cy=true]').should('not.exist');
    cy.get('[data-cy=constructor-bun-1] ').contains('Выберите булки');
    cy.get('[data-cy=constructor-ingredients] ').contains('Выберите начинку');
    cy.get('[data-cy=constructor-bun-2] ').contains('Выберите булки');
  });

  afterEach(() => {
    cy.clearAllLocalStorage();
    deleteCookie('accessToken');
  });
});
