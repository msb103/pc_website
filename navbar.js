//const template = document.getElementById('navbar');
const navbar = document.createElement('template');
const rootPath = window.location.pathname.split('/').slice(0, -1).join('/') + '/';

navbar.innerHTML = `

<div class="top-ribbon">
    <link rel="stylesheet" href = "styles.css">
    <link href='https://fonts.googleapis.com/css?family=DM Sans' rel='stylesheet'>        
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet">

    <div class="logo">
      <a href="index.html"><img src="logo_orange_transparant.png" alt="Logo"></a> <!-- Replace 'logo.png' with the path to your logo image -->
    </div>
    <div class="title">
      <a href="index.html" style="text-decoration: none; color: white;">Product Crafts </a>
      
    </div>
    <div class="menu-container">
      <ul class="menu-links">
        
        <!--li><a href="board.html">The Board  </a></li> <!-- Replace '#' with the link to The Board page -->
        <li><a href="DesignGallery.html">Design Gallery </a></li> <!-- Replace '#' with the link to the Design Gallery page -->
        <li><a href="blog.html">Crafter's Blog  </a></li> <!-- Replace '#' with the link to the Crafters Blog page -->
        <li><a href="contactus.html">Contact Us </a></li> <!-- Replace '#' with the link to the Home page -->
      </ul>
    </div>
</div>

`;

document.body.appendChild(navbar.content);



