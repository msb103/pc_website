function createPaginationDots(numDots) {

    const paginationDotsContainer = document.querySelector('.pagination-dots');
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('span');
      dot.classList.add('pagination-dot');
      if (i === 0) {
        dot.classList.add('active');
      }
      paginationDotsContainer.appendChild(dot);
    }
  }
  
  // Call the function to create pagination dots based on the number of images
  createPaginationDots(5); // Change 3 to the number of images in your folder