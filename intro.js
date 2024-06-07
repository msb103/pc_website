document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    //const displayedImage = document.getElementById('introImage');
    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');
    const image3 = document.getElementById('image3');
    const display = document.getElementById('msg');

    // Function to handle the click event
    const handleCardClick = (btn) => {
        //const imageSrc = card.getAttribute('intro-image');
        //displayedImage.src = imageSrc;
        const images = JSON.parse(btn.getAttribute('data-images'));
        const msg=JSON.parse(btn.getAttribute('msg'));
            image1.src = images[0];
            image2.src = images[1];
            image3.src = images[2];
            //display = msg;
        // Remove active class from all cards
        buttons.forEach(card => card.classList.remove('active'));
        // Add active class to the clicked card
        btn.classList.add('active');
    };

    // Add click event listeners to all cards
    buttons.forEach(card => {
        card.addEventListener('click', () => handleCardClick(card));
    });

    // Set the default card (first card in this case) as selected
    if (buttons.length > 0) {
        handleCardClick(buttons[0]);
    }
});
