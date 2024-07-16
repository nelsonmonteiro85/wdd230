const baseURL = "https://nelsonmonteiro85.github.io/wdd230/";
const linksURL = "https://nelsonmonteiro85.github.io/wdd230/data/links.json";

async function getLinks() {
    try {
        const response = await fetch(linksURL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayLinks(data.weeks);
    } catch (error) {
        console.error('Error fetching the links:', error);
    }
}

function displayLinks(weeks) {
    const linksContainer = document.querySelector('#links-container');
    linksContainer.innerHTML = ''; // Clear any existing content

    weeks.forEach(week => {
        const weekItem = document.createElement('li');
        weekItem.innerHTML = `${week.week}: `;

        week.links.forEach((link, index) => {
            const linkElement = document.createElement('a');
            // Check if the link is an absolute URL
            if (link.url.startsWith("http")) {
                linkElement.href = link.url;
            } else {
                linkElement.href = `${baseURL}${link.url}`;
            }
            linkElement.textContent = link.title;

            weekItem.appendChild(linkElement);

            if (index < week.links.length - 1) {
                weekItem.innerHTML += ' | ';
            }
        });

        linksContainer.appendChild(weekItem);
    });
}

// Initial fetch and display of links
getLinks();
