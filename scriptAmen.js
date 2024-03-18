const GITHUB_USERS = `https://api.github.com/users`

// HTTP-методы
const POST = 'POST'
const DELETE = 'DELETE'
const PUT = 'PUT'


let getDB = () => fetch(GITHUB_USERS)
    .then(r => {
        console.log(r)
    })
    .then(r => r.json())
    .then(r => console.log(r))
    .then(r => {

        // СПИСОК С ПОЛЬЗОВАТЕЛЯМИ
        let userLogins = [];
        for (let userData of r) {
            let username = userData.login;
            userLogins.push(username);
        }

        // ПОЛУЧИТЬ ИНФУ ПО КОНКРЕТНОМУ ПОЛЬЗОВАТЕ
        async function getUserData(userLogin) {
            let userData
            for (let username of userLogins) {
                if (userLogin === username) {
                    await fetch(`${GITHUB_USERS}/${userLogin}`)
                        .then(r => r.json())
                        .then(r => {
                            console.log(r)
                            userData = r;
                        })
                        .catch(e => console.log(e))
                }
            }
            console.log(userData)
            return userData
            //возвращает объект с характеристиками пользователя {login: 'defunkt', id: 2, node_id: 'MDQ6VXNlcjI=', avatar_url
        }

        getUserData('mojombo')
            .then(r => r.response())
            .then(r => r.json())
            .then(r => console.log(r))
            .catch(e => console.log(e))




        // let getUserRepos = (username) => {
        //     let userData = getUserData(username);
        //     let reposData = [];
        //     for (let repo in userData) {
        //         let repo = userData.repos_url
        //         reposData.push(repo)
        //         console.log(reposData);
        //     }
        //     return reposData
        // }
        // console.log(getUserRepos('mojombo'))


        // fetch('https://api.github.com/users/mojombo/repos')
        //     .then(r => r.json())
        //     .then(r => {
        //         console.log(r)
        //         let reposNames = [];
        //         for (let repo of r) {
        //             let repoName = r.name;
        //             reposNames.push(repoName);
        //             console.log(reposNames);
        //         }
        //         console.log(r.name)
        //
        //     })
        //     .catch(e => console.log(e))

//https://api.github.com/users/mojombo/repos

        // console.log(getRepos("mojombo"))
        // console.log(getUser(1));

    })
// .catch(e => console.log(e))


getDB()
