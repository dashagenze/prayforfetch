const USERNAME_FORM = document.getElementById('username');


USERNAME_FORM.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(USERNAME_FORM);
    const username = formData.get('username');

    getRepos(username)
        .catch(e => console.log(e))

})


async function getRepos (username) {
    await fetch(`https://api.github.com/users/${username}/repos`)
        .then(r => r.json())
        .then(repos => {

            // let title = document.createElement('h2');
            // title.textContent = `📑Репозитории ${username}!`;
            //
            // let div = document.getElementById('div');
            // div.append(title);

            for (let repo of repos) {

                console.log(repo.name);
                console.log(repo.url);
            }


        })
        .catch(e => console.log(e))

}



