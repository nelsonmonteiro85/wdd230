document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the directory.html page
    if (window.location.pathname.endsWith('directory.html')) {
        const gridButton = document.querySelector("#grid");
        const listButton = document.querySelector("#list");
        const membersContainer = document.querySelector("#members");

        if (!gridButton || !listButton || !membersContainer) {
            console.error("Required elements are missing in the DOM.");
            return;
        }

        // Fetch and display members
        fetch('data/members.json')
            .then(response => response.json())
            .then(data => {
                const members = data.members;

                // Function to create a member card
                function createMemberCard(member) {
                    return `
                        <section>
                            <img src="${member.image}" alt="${member.name}">
                            <h3>${member.name}</h3>
                            <p>${member.description}</p>
                            <p>${member.address}</p>
                            <p>${member.phone}</p>
                            ${member.email ? `<p>Email: <a href="mailto:${member.email}" class="member-link">${member.email}</a></p>` : ''}
                            <p><a href="${member.website}" target="_blank" class="member-link">${member.website}</a></p>
                            <p>Membership Level: ${member.membershipLevel}</p>
                        </section>
                    `;
                }

                // Render members in grid format
                function renderGrid(members) {
                    membersContainer.innerHTML = members.map(createMemberCard).join('');
                    membersContainer.classList.add("grid");
                    membersContainer.classList.remove("list");
                }

                // Render members in list format
                function renderList(members) {
                    membersContainer.innerHTML = members.map(member => `
                        <section>
                            <h3>${member.name}</h3>
                            <p>${member.description}</p>
                            <p>${member.address}</p>
                            <p>${member.phone}</p>
                            ${member.email ? `<p>Email: <a href="mailto:${member.email}" class="member-link">${member.email}</a></p>` : ''}
                            <p><a href="${member.website}" target="_blank" class="member-link">${member.website}</a></p>
                            <p>Membership Level: ${member.membershipLevel}</p>
                        </section>
                    `).join('');
                    membersContainer.classList.add("list");
                    membersContainer.classList.remove("grid");
                }

                // Initial render in grid view
                renderGrid(members);

                // Event listeners for toggling views
                gridButton.addEventListener("click", () => renderGrid(members));
                listButton.addEventListener("click", () => renderList(members));
            })
            .catch(error => console.error('Error loading members data:', error));
    }
});
