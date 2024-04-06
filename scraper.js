const {firefox} = require('playwright');

(async () => {
    // Launch the browser
    const browser = await firefox.launch({headless: true});
    // Open a new page
    const page = await browser.newPage();

    // Navigate to the school portal login page
    await page.goto('https://sinef.fumec.br/jsp/login.jsp');

    // Replace these with the selectors for your login form inputs and button
    const usernameSelector = 'input[name=j_username]';
    const passwordSelector = 'input[name=j_password]';
    const loginButtonSelector = 'button[type=submit]';

    // Replace 'your_username' and 'your_password' with your actual login credentials
    await page.fill(usernameSelector, 'YOUR_USERNAME');
    await page.fill(passwordSelector, 'YOUR_PASSWORD');
    await page.click(loginButtonSelector);

    // Wait for navigation after the login
    await page.waitForURL('https://sinef.fumec.br/aluno/index.html');

    // Navigate to the internship postings page
    // Replace with the actual URL or click the navigation link
    await page.goto('https://sinef.fumec.br/sinef/aluno/crud/Oferta');

    // Define a selector for the postings table or container
    // Scrape the data from the table rows with class 'listagemBody1' or 'listagemBody2'
    const postings = await page.$$eval('tr.listagemBody1, tr.listagemBody2', rows => {
        return rows.map(row => {
            // Assuming each row has the same structure and number of cells (td)
            const cells = row.querySelectorAll('td');
            return {
                empresa: cells[0].innerText.trim(),
                publicacao: cells[1].innerText.trim(),
                bolsa: cells[2].innerText.trim(),
                periodo: cells[3].innerText.trim(),
                curso: cells[4].innerText.trim(),
                tipo: cells[5].innerText.trim(),
                ofertadoAte: cells[6].innerText.trim(),
                // ... Add more fields if there are more cells with information
            };
        });
    });

    // Assuming 'postings' is the array of objects you've scraped
    const htmlContent = postings.map(posting => {
        return `
    <div class="posting">
      <h2>${posting.empresa}</h2>
      <p>Publicação: ${posting.publicacao}</p>
      <p>Bolsa: ${posting.bolsa}</p>
      <p>Período: ${posting.periodo}</p>
      <p>Curso: ${posting.curso}</p>
      <p>Tipo: ${posting.tipo}</p>
      <p>Ofertado Até: ${posting.ofertadoAte}</p>
    </div>
  `;
    }).join('');


    const fs = require('fs');

// Write the HTML content to a new HTML file
    fs.writeFile('internshipPostings.html', htmlContent, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('Saved internship postings to internshipPostings.html');
    });

    // Close the browser
    await browser.close();
})();
