function generateTeam(team) {
    let html = '';
    
team.forEach(employee => {
      let roleInfo = '';
      
    if (employee.getRole() === 'Manager') {
        roleInfo = `Office number: ${employee.getOfficeNumber()}`;
      } else if (employee.getRole() === 'Engineer') {
        roleInfo = `GitHub: <a href="https://github.com/${employee.getGithub()}" target="_blank" rel="noopener noreferrer">${employee.getGithub()}</a>`;
      } else if (employee.getRole() === 'Intern') {
        roleInfo = `School: ${employee.getSchool()}`;
      }
      
      html += `
        <div class="card employee-card">
          <div class="card-header bg-primary text-white">
            <h2 class="card-title">${employee.getName()}</h2>
            <h3 class="card-title"><i class="${getIcon(employee.getRole())} mr-2"></i>${employee.getRole()}</h3>
          </div>
          <div class="card-body">
            <ul class="list-group">
              <li class="list-group-item">ID: ${employee.getId()}</li>
              <li class="list-group-item">Email: <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></li>
              <li class="list-group-item">${roleInfo}</li>
            </ul>
          </div>
        </div>
      `;
    });
    
    return html;
  }
  
  function generateHTML(team) {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>My Team</title>
          <link rel="stylesheet" href="style.css">
          <script src="https://kit.fontawesome.com/c502137733.js"></script>
        </head>
        <body>
          <header>
            <h1>My Team</h1>
          </header>
          <main>
            <section id="team-cards">
              ${generateTeam(team)}
            </section>
          </main>
        </body>
      </html>
    `;
  }
  
  function getIcon(role) {
    if (role === 'Manager') {
      return 'fas fa-mug-hot';
    } else if (role === 'Engineer') {
      return 'fas fa-glasses';
    } else if (role === 'Intern') {
      return 'fas fa-user-graduate';
    }
  }
  
  module.exports = generateHTML;
  