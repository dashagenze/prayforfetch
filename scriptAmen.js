const USERNAME_FORM = document.getElementById('USERNAME_FORM');
const back = document.getElementById('back');
const message = document.getElementById('message');
let title = document.createElement('h2');
let div = document.getElementById('message');


div.append(title);

USERNAME_FORM.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(USERNAME_FORM);
    const username = formData.get('username');
    if (!username) {
        console.log('введите пользователя')
    }

    try {
        getRepos(username)
            .catch(e => console.log(e))
    } catch {
        alert(e);
    }

    USERNAME_FORM.style.display = 'none';
})


async function getRepos (username) {
    let response = await fetch(`https://api.github.com/users/${username}/repos`)
    if (response.ok) {
    let repos = await response.json()

        console.log(repos);

        title.textContent = `📑Репозитории ${username}!`;

        // НЕТ РЕПОЗИТОРИЕВ
        if (repos.length === 0) {
            title.textContent = `У пользователя ${username} не найдено открытых репозиториев :)`
        }

        for (let repo of repos) {
            let repoLink = document.createElement('a');
            repoLink.setAttribute('href', `${repo.url}`);
            let divider = document.createElement('hr');
            repoLink.innerHTML = `📁💫${repo.name}`;

            div.append(repoLink);
            div.append(divider);

            console.log(repo.name);
            console.log(repo.url);
        }

    } else if (!response.ok) {
        back.classList.toggle('animatedBack');
        message.classList.toggle('animatedMessage');

        if (response.status === 404) {
            message.textContent = 'Такого пользователя нет1!'
        } else if (500< response.status <599) {
            message.textContent = 'Технические шоколадки ;((!'
        } else {message.textContent = 'Непредвиденная ошибка!'}

    } else {console.log(response.text())}
}



