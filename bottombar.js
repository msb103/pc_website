const bottombar = document.createElement('template');

bottombar.innerHTML = `

<div class="bottom-ribbon">
  <div class="logo">
    <img src="logo_white_transparant.png" alt="Logo"> <!-- Replace 'logo.png' with the path to your logo image -->
  </div>
  <div class="title">
    Product Crafts <!-- Title next to the logo -->
  </div>
  <div class="menu-container">
    <ul class="menu-links">
      <li><b href="research.html">Research |</b></li> <!-- Replace '#' with the link to the Home page -->
      <li><b href="partnership.html">Partner with us |</b></li> <!-- Replace '#' with the link to The Board page -->
      <li><a href="aboutus.html">About Us |</a></li> <!-- Replace '#' with the link to the Design Gallery page -->
      <li><b href="contactus.html">Contact Us</b></li> <!-- Replace '#' with the link to the Crafters Blog page -->
    </ul>
  </div>
  
</div>

`;

document.body.appendChild(bottombar.content);

document.addEventListener('DOMContentLoaded', function() {
  const bottomNav = document.querySelector('.bottom-ribbon');


  function adjustNav() {
    const pageHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    if (pageHeight <= windowHeight) {
        bottomNav.classList.add('fixed');
    } else {
        bottomNav.classList.remove('fixed');
    }
}

  adjustNav(); // Initial check
  window.addEventListener('resize', adjustNav); // Check on window resize
});
