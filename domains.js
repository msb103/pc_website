document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const domainImage = document.getElementById('domainImage');

    // Function to handle the click event
    const handleCardClick = (card) => {
        const imageSrc = card.getAttribute('domain-image');
        domainImage.src = imageSrc;
        // Remove active class from all cards
        cards.forEach(card => card.classList.remove('active'));
        // Add active class to the clicked card
        card.classList.add('active');
    };

    // Add click event listeners to all cards
    cards.forEach(card => {
        card.addEventListener('click', () => handleCardClick(card));
    });

    // Set the default card (first card in this case) as selected
    if (cards.length > 0) {
        handleCardClick(cards[0]);
    }
});
