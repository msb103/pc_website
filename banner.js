// Function to load images from a folder
folderPath = "./banner-images";
currentIndex = 0;
function loadImagesFromFolder(folderPath) {
    // Add your logic here to fetch images from the specified folder path
    // You can use AJAX requests, server-side scripting, or any other method to dynamically load images
    
    // For demonstration purposes, let's assume you have an array of image URLs
    const imageUrls = [
      "./banner_images/data_oil.PNG",
      "./banner_images/golden_goose.png",
      "./banner_images/golden_ratio.PNG",
      "./banner_images/johngalt.png",
      "./banner_images/vinci_tesla.PNG"
    ];
  
    return imageUrls;
  }

  function loadImagesWithLinksFromFolder(folderPath) {
    // Define an array of objects containing image URLs and hyperlinks
    /*const imagesWithLinks = [
      { imageUrl: `${folderPath}/data_oil.PNG`, linkUrl: "data_oil.html" },
      { imageUrl: `${folderPath}/golden_goose.png`, linkUrl: "goldengoose.html" },
      { imageUrl: `${folderPath}/golden_ratio.PNG`, linkUrl: "golden_ratio.html" },
      { imageUrl: `${folderPath}/johngalt.png`, linkUrl: "johngalt.html" },
      { imageUrl: `${folderPath}/vinci_tesla.PNG`, linkUrl: "davinci_tesla.html" } */
       //Add more objects for additional images as needed

       const imagesWithLinks = [
        { imageUrl: `${folderPath}/whatisND.png`, linkUrl: "data_oil.html" },
        { imageUrl: `${folderPath}/whatisGE.png`, linkUrl: "goldengoose.html" },
        { imageUrl: `${folderPath}/whyGR.png`, linkUrl: "golden_ratio.html" },
        { imageUrl: `${folderPath}/WhoIsJG3.png`, linkUrl: "johngalt.html" },
        { imageUrl: `${folderPath}/whatDT.png`, linkUrl: "davinci_tesla.html" }
    ];
  
    return imagesWithLinks;
  }
  
  // Function to update the banner image
  function updateBannerImage() {
    const bannerImage = document.getElementById("banner-image");
    const imagesWithLinks = loadImagesWithLinksFromFolder("./banner_images");
    
    // Set the src attribute of the image element
  //bannerImage.src = imageUrls[currentIndex];
  bannerImage.src = imagesWithLinks[currentIndex].imageUrl;
  // Set the href attribute of the parent <a> tag
  const bannerLink = document.getElementById("banner-link");
  bannerLink.href = imagesWithLinks[currentIndex].linkUrl;

  // Increment index for the next image
  currentIndex = (currentIndex + 1) % imagesWithLinks.length;
  updatePaginationDots(currentIndex);
    
  }

  function nextImage() {
    const imagesWithLinks = loadImagesWithLinksFromFolder("./banner_images");
    //currentIndex = (currentIndex + 1) % imagesWithLinks.length;
    updateBannerImage(currentIndex);
}

function prevImage() {
    const imagesWithLinks = loadImagesWithLinksFromFolder("./banner_images");
    currentIndex = (currentIndex - 2 + imagesWithLinks.length) % imagesWithLinks.length;
    updateBannerImage(currentIndex);
}
  
  // Initial call to update the banner image
  updateBannerImage();
  setInterval(updateBannerImage, 5000);
  
  // Refresh the banner image every 10 seconds
  


  function createPaginationDots(numDots) {

    const paginationDotsContainer = document.querySelector('.pagination-dots');
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('span');
      dot.classList.add('pagination-dot');
      if (i === 0) {
        dot.classList.add('active');
      }
      dot.addEventListener('click', () => updateBannerImage(i-1));
      paginationDotsContainer.appendChild(dot);
    }
  }

  function updatePaginationDots(currentIndex) {
    const paginationDots = document.querySelectorAll('.pagination-dot');
    paginationDots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  // Call the function to create pagination dots based on the number of images
  createPaginationDots(5); // Change 3 to the number of images in your folder

  function showImage(imageSrc) {
    const displayedImage = document.getElementById('displayedImage');
    displayedImage.src = imageSrc;
}