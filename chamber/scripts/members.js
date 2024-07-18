document.addEventListener('DOMContentLoaded', async () => {
    try {
        const members = await fetchMembers();

        // Filter gold and silver members
        const spotlightMembers = members.filter(member => member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver');

        // Randomly select spotlight members (up to 3)
        const randomSpotlights = shuffleArray(spotlightMembers).slice(0, 3);

        // Get the spotlight container
        const spotlightContainer = document.getElementById('spotlight-container');
        spotlightContainer.innerHTML = ''; // Clear existing content

        // Populate spotlight container with member data
        randomSpotlights.forEach(member => {
            const memberCard = createMemberCard(member);
            spotlightContainer.appendChild(memberCard);
        });

    } catch (error) {
        console.error('Error loading member spotlights:', error);
    }
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

// Function to create member card
function createMemberCard(member) {
    console.log('Member image path:', member.image); // Check the image path

    const card = document.createElement('div');
    card.classList.add('member-card');

    // Adjust the image path based on the directory structure
    const imagePath = member.image.startsWith('images/') ? member.image : `images/${member.image}`;

    const image = document.createElement('img');
    image.src = imagePath;
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
    websiteLink.textContent = member.website;
    websiteLink.classList.add('member-card-link');
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
