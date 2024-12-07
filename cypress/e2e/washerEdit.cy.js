describe('Washer Edit Dialog', () => {
  // before(() => { // not working reliably -> run the server manually
  //   cy.ensureServerIsRunning('http://localhost:3000', 'vite');
  // });
  beforeEach(() => {
    // Visit the application page (replace with your actual URL or route)
    cy.viewport('samsung-s10') // Set viewport to 375px x 667px
    cy.visit('http://localhost:3000'); // Adjust this path to your app
  });

  it('should open the washer edit dialog and display washer details', () => {
    cy.get('button').contains('Neu').click(); // Trigger dialog opening
    cy.get('#device_type').focus().type('washer');
    cy.get("#location").focus().type("AH");
    cy.get("#device-id").type("10");
    cy.get("#mac").type("02:42:b4:1e:1c:cd");
    cy.get("#relayduration").type("100");
    cy.get("#detergentname").type("AHP1");
    cy.get("#detergentnr").type("8");
    cy.get("#detergentrelayduration").type("200");
    cy.get("#softenername").type("AHP1");
    cy.get("#softenernr").type("9");
    cy.get("#softenerrelayduration").type("150");
    cy.get("#save").click();
  });



});
