const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

button.addEventListener('click', () => {
    if (input.value.trim() !== '') {
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');

        li.textContent = input.value.trim();
        deleteButton.textContent = '❌';

        li.appendChild(deleteButton);
        list.appendChild(li);

        deleteButton.addEventListener('click', () => {
            list.removeChild(li);
            input.focus();
        });

        input.value = '';
        input.focus();
    } else {
        input.focus();
    }
});