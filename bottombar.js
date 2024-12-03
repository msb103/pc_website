const bottombar = document.createElement('template');

bottombar.innerHTML = `

<div class="bottom-ribbon">
  <div class="logo">
    <a href="index.html"><img src="logo_white_transparant.png" alt="Logo"> </a> 
  </div>
  <div class="title">
    <a href="index.html" style="text-decoration: none; color: white;">Product Crafts </a>
  </div>
  <div class="menu-container" style="max-width:35%;">
    <a  href = ""> <img src="contactus.png" alt="Contact Us" style="width:100%;"> </a>
    <!--ul class="menu-links">
      <li><b href="research.html">Research |</b></li>
      <li><b href="partnership.html">Partner with us |</b></li> 
      <li><a href="aboutus.html">About Us |</a></li> 
      <li><a href="contactus.html">Contact Us</a></li> 
    </ul-->
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
