document.addEventListener('DOMContentLoaded', () => {
    const gridButton = document.querySelector("#grid");
    const listButton = document.querySelector("#list");
    const display = document.querySelector("#members");

    gridButton.addEventListener("click", () => {
        display.classList.add("grid");
        display.classList.remove("list");
    });

    listButton.addEventListener("click", () => {
        display.classList.add("list");
        display.classList.remove("grid");
    });

    fetch('data/members.json')
        .then(response => response.json())
        .then(data => {
            const members = data.members;
            display.innerHTML = ''; // Clear existing content

            members.forEach(member => {
                const section = document.createElement('section');
                section.innerHTML = `
                    <img src="images/${member.image}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <p>${member.membershipLevel}</p>
                    <a href="${member.website}" target="_blank">Website</a>
                    <p>${member.description}</p>
                `;
                display.appendChild(section);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});