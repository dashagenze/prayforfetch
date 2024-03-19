const USERNAME_FORM = document.getElementById('USERNAME_FORM');
const body = document.getElementById('body');

USERNAME_FORM.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(USERNAME_FORM);
    const username = formData.get('username');

    try {
        getRepos(username)
            .catch(e => console.log(e))
    } catch {
        alert(e);
    }


    USERNAME_FORM.style.display = 'none';
})


async function getRepos (username) {
    await fetch(`https://api.github.com/users/${username}/repos`)
        .then(r => r.json())
        .then(repos => {

            let title = document.createElement('h2');
            title.textContent = `📑Репозитории ${username}!`;

            let div = document.getElementById('div');
            div.append(title);

            // ОШИБКА НЕТ РЕПОЗИТОРИЕВ
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

        })
        .catch(e => {
            console.log(e.message)
                // alert('пользователь не найден ;(((');
                // location.reload()
            }
        )

}

