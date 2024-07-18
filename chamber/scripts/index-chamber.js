document.addEventListener('DOMContentLoaded', function () {
    // Update current year
    let date = new Date().getFullYear();
    document.querySelector(".currentYear").textContent = date;

    // Update last modified date
    let lastModifiedDate = new Date(document.lastModified).toLocaleString();
    document.querySelector(".lastModified").textContent = lastModifiedDate;

    // Set the hidden timestamp field with the current date and time
    let timestamp = new Date().toISOString();
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = timestamp;
    }

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const heroImg = document.querySelector('.hero-img');

    darkModeToggle.addEventListener('click', () => {
        console.log('Dark mode toggle clicked');
        body.classList.toggle('dark-mode');

        // Check if heroImg exists before trying to change its src
        if (heroImg) {
            if (body.classList.contains('dark-mode')) {
                // Switch to dark mode image
                heroImg.src = "images/Porto-ChamberN.webp";
            } else {
                // Switch to light mode image
                heroImg.src = "images/Porto-ChamberD.webp";
            }
        }

        // Toggle dark mode icon text content
        if (darkModeToggle.textContent.includes("🌙")) {
            darkModeToggle.textContent = "☀️";
        } else {
            darkModeToggle.textContent = "🌙";
        }
    });

    // Hamburger menu toggle functionality
    const hamburger = document.getElementById('hamburger');
    const links = document.querySelector('.links');
    const mainContent = document.querySelector('.main-directory');
    const heroSection = document.querySelector('.hero');
    const heroMsg = document.querySelector('#hero-msg');
    const footer = document.querySelector('footer');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('open');
            links.classList.toggle('open');

            if (links.classList.contains('open')) {
                const linksHeight = links.offsetHeight;

                if (heroSection) heroSection.style.transform = `translateY(${linksHeight}px)`;
                if (heroMsg) heroMsg.style.transform = `translateY(${linksHeight}px)`;
                if (mainContent) mainContent.style.transform = `translateY(${linksHeight}px)`;
                if (footer) footer.style.transform = `translateY(${linksHeight}px)`;
                if (mainContent) mainContent.style.transition = 'transform 0.9s ease';
            } else {
                if (heroSection) heroSection.style.transform = 'translateY(0)';
                if (heroMsg) heroMsg.style.transform = 'translateY(0)';
                if (mainContent) mainContent.style.transform = 'translateY(0)';
                if (footer) footer.style.transform = 'translateY(0)';
            }
        });
    }

    // Fetch members and populate member spotlights
    fetchMembersAndPopulateSpotlights();
});

// Function to fetch members from JSON file
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.members;
    } catch (error) {
        console.error('Error fetching members:', error);
        return [];
    }
}

// Function to populate member spotlights
async function fetchMembersAndPopulateSpotlights() {
    try {
        const members = await fetchMembers();

        // Filter gold and silver members
        const spotlightMembers = members.filter(member => member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver');

        // Randomly select spotlight members (up to 3)
        const randomSpotlights = shuffleArray(spotlightMembers).slice(0, 3);

        // Get the spotlight container
        const spotlightContainer = document.getElementById('spotlight-container');

        // Clear any existing content in spotlight container
        spotlightContainer.innerHTML = '';

        // Populate spotlight container with member data
        randomSpotlights.forEach(member => {
            const memberCard = createMemberCard(member);
            spotlightContainer.appendChild(memberCard);
        });

    } catch (error) {
        console.error('Error loading member spotlights:', error);
    }
}

// Function to create member card
function createMemberCard(member) {
    const card = document.createElement('div');
    card.classList.add('member-card');

    const image = document.createElement('img');
    image.src = member.image;
    image.alt = member.name;
    card.appendChild(image);

    const name = document.createElement('h4');
    name.textContent = member.name;
    card.appendChild(name);

    const description = document.createElement('p');
    description.textContent = member.description;
    card.appendChild(description);

    const websiteLink = document.createElement('a');
    websiteLink.href = member.website;
    websiteLink.textContent = 'Visit Website';
    card.appendChild(websiteLink);

    return card;
}

// Function to shuffle array (Fisher-Yates shuffle)
function shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle
    while (currentIndex !== 0) {
        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // Swap it with the current element
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}