//const template = document.getElementById('navbar');
const navbar = document.createElement('template');
const rootPath = window.location.pathname.split('/').slice(0, -1).join('/') + '/';

navbar.innerHTML = `

<div class="top-ribbon">
    <link rel="stylesheet" href = "styles.css">
    <div class="logo">
      <a href="index.html"><img src="logo_orange_transparant.png" alt="Logo"></a> <!-- Replace 'logo.png' with the path to your logo image -->
    </div>
    <div class="title">
      <a href="index.html" style="text-decoration: none; color: white;">Product Crafts </a>
      
    </div>
    <div class="menu-container">
      <ul class="menu-links">
        <li><a href="index.html">Home |</a></li> <!-- Replace '#' with the link to the Home page -->
        <!--li><a href="board.html">The Board  |</a></li> <!-- Replace '#' with the link to The Board page -->
        <li><a href="designgallery.html">Design Gallery |</a></li> <!-- Replace '#' with the link to the Design Gallery page >
        <li><a href="blog.html">Crafter's Blog  |</a></li> <!-- Replace '#' with the link to the Crafters Blog page -->
      </ul>
      <!--div class="menu-icon">
        <img src="menu-icon.png" alt="Menu"> 
      </div-->
    </div>
</div>

`;

document.body.appendChild(navbar.content);



