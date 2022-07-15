const pag = document.querySelector('.pagination')

let currentPage = 1
let count = 4

const fetchGet = async (per_page) => {
    var users = await fetch(`https://api.github.com/users`)
        .then(res => res.json())
    return users
}
const searchFetchGet = async (login, order, currentPage, per_page) => {
    var users = await fetch(`https://api.github.com/search/users?q=${login}&per_page=${per_page}&page=${currentPage}&order=${order}&sort=followers`)
        .then(res => res.json())
    return users
}

var gotUsers = []
fetchGet()
    .then(users => {
        showUsers(users, count, currentPage)
    })


function orderBy(sel) {
    const order = sel.options[sel.selectedIndex].value
    const login = document.querySelector('#searchInput').value
    const count = document.querySelector('#inputPerpage').value
    let currentPage = document.querySelector('.current-page').value
    const per_page = document.querySelector('.per-page').value 

    searchFetchGet(login, order, currentPage, per_page)
        .then(users => {
            showUsers(users, count, currentPage)
            users.items.map(item => gotUsers.push(item))
        })
    
}


function nextPage() {
    const login = document.querySelector('#searchInput').value
    const order = document.querySelector('.form-select-sort').value
    const count = document.querySelector('#inputPerpage').value
    const per_page = document.querySelector('.per-page').value
    currentPage = currentPage + 1
    searchFetchGet(login, order, currentPage, per_page)
        .then(users => showUsers(users, count, currentPage))
}
function prevPage() {
    if(currentPage != 1) {
        const login = document.querySelector('#searchInput').value
        const order = document.querySelector('.form-select-sort').value
        const count = document.querySelector('#inputPerpage').value
        const per_page = document.querySelector('.per-page').value
        currentPage = currentPage - 1
        if (order == 'asc') {
            searchFetchGet(login, order, currentPage, per_page)
                .then(users => showUsers(users, count, currentPage))
        } else {
            searchFetchGet(login, order, currentPage, per_page)
                .then(users => showUsers(users, count, currentPage))
        }
    } 
    return 
}


const showUsers = (users, count, currentPage) => {
    var loader = document.querySelector('.loader')
    const content = document.querySelector('.content-users')
    let indexOfLast = currentPage * count
    let indexOfFirst = indexOfLast - count

    if (users.items) {
        let totalUsers = users.total_count
        let totalPages = Math.ceil(totalUsers / count)
        pagination(currentPage, totalPages)
    } else {
        let totalUsers = users.length
        let totalPages = Math.ceil(totalUsers / count)
        pagination(currentPage, totalPages)
    }
    if (users.login) {
        users = users.slice(indexOfFirst, indexOfLast)
    }
    content.innerHTML = ``
    if (users) {
        let i
        var user = localStorage.getItem('users')
        user = JSON.parse(user)

        if (users.items) {
            for (i in users.items) {
                if (user) {
                    foundUser = user.filter(item => item.id == users.items[i].id)
                    content.innerHTML += `
                    <div class="card my-2" style="width: 100%;">
                        <div class="card-body d-flex justify-content-between align-items-center flex-wrap">
                            <div class="about-user d-flex justify-content-center flex-wrap">
                                <img src="${users.items[i].avatar_url}" width='100px' alt="Фотка пользователа">
                                <div class="about-user-text mx-2 d-flex flex-column justify-content-evenly flex-wrap">
                                    <h3 class='login'>${users.items[i].login}</h3>
                                    <a href='${users.items[i].url}'>link to github</a>
                                </div>
                            </div>
                            <div class="btns d-flex flex-column my-2">
                                <button onclick='addFavorite(${users.items[i].id})' type="button" class="${foundUser[0] ? 'btn btn-success mb-2' : 'btn btn-secondary mb-2'}">Add favorite</button>
                                <button onclick='showRep()' type="button" class="btn btn-secondary">Show repository</button>
                            </div>
                        </div>
                    </div> 
                    `
                } else {
                    content.innerHTML += `
                    <div class="card my-2" style="width: 100%;">
                        <div class="card-body d-flex justify-content-between align-items-center flex-wrap">
                            <div class="about-user d-flex justify-content-center flex-wrap">
                                <img src="${users.items[i].avatar_url}" width='100px' alt="Фотка пользователа">
                                <div class="about-user-text mx-2 d-flex flex-column justify-content-evenly flex-wrap">
                                    <h3 class='login'>${users.items[i].login}</h3>
                                    <a href='${users.items[i].url}'>link to github</a>
                                </div>
                            </div>
                            <div class="btns d-flex flex-column my-2">
                                <button onclick='addFavorite(${users.items[i].id})' type="button" class="btn btn-secondary mb-2">Add favorite</button>
                                <button onclick='showRep()' type="button" class="btn btn-secondary">Show repository</button>
                            </div>
                        </div>
                    </div> 
                    `
                }
            }
        } else {
            users = users.slice(indexOfFirst, indexOfLast)
            for (i in users) {
                content.innerHTML += `
                <div class="card my-2" style="width: 100%;">
                    <div class="card-body d-flex justify-content-between align-items-center flex-wrap">
                        <div class="about-user d-flex justify-content-center flex-wrap">
                            <img src="${users[i].avatar_url}" width='100px' alt="Фотка пользователа">
                            <div class="about-user-text mx-2 d-flex flex-column justify-content-evenly flex-wrap">
                                <h3 class='login'>${users[i].login}</h3>
                                <a href='${users[i].url}'>link to github</a>
                            </div>
                        </div>
                        <div class="btns d-flex flex-column my-2">
                            <button onclick='addFavorite(${users[i].id})' type="button" class="btn btn-secondary mb-2">Add favorite</button>
                            <button onclick='showRep()' type="button" class="btn btn-secondary">Show repository</button>
                        </div>
                    </div>
                </div> 
                `
            }
        }
    } else {
        loader.classList.add('done')
        content.innerHTML += `<h1>ERROR</h1>`
    }
}

const pagination = (currentPage, totalPages) => {
    const pag = document.querySelector('.pagination')
    pag.innerHTML = `
        <button type="button" onclick='prevPage()' class="prev-page btn btn-light font-weight-bold">←prev</button>
            <input value="${currentPage}" onchange="changePage(this.value)" maxlength="2" type="text" id="inputCurrentPage" class="form-input current-page mx-2">
        <button type="button" onclick='nextPage()' class="next-page btn btn-light font-weight-bold">next→</button>
    `
}

function changePage(currentPage) {
    const order = document.querySelector('.form-select-sort').value
    const per_page = document.querySelector('.per-page').value
    const login = document.querySelector('#searchInput').value
    if (order == 'asc') {
        searchFetchGet(login, order, currentPage, per_page)
            .then(users => showUsers(users, per_page, currentPage))
    } else {
        searchFetchGet(login, order, currentPage, per_page)
            .then(users => showUsers(users, per_page, currentPage))
    }
}



document.querySelector('#searchInput').addEventListener('change', function () {
    const login = this.value
    const order = document.querySelector('.form-select-sort').value
    const count = document.querySelector('#inputPerpage').value
    const per_page = document.querySelector('.per-page').value

    if (login) {
        if (order == 'asc') {
            searchFetchGet(login, order, currentPage, per_page)
                .then(users => showUsers(users, count, currentPage))
        } else {
            searchFetchGet(login, order, currentPage, per_page)
                .then(users => showUsers(users, count, currentPage))
        }
    } else {
        fetchGet()
            .then(users => {
                showUsers(users, count, currentPage)
                users.map(item => gotUsers.push(item))
            })
    }
})

const countPerPage = document.querySelector('#inputPerpage').addEventListener('change', function () {
    var per_page = this.value
    const order = document.querySelector('.form-select-sort').value
    var currentPage = document.querySelector('.current-page').value
    const login = document.querySelector('#searchInput').value
    currentPage = currentPage.slice('/')[0]
    
    if (order == 'asc') {
        searchFetchGet(login, order, currentPage, per_page)
            .then(users => showUsers(users, per_page, currentPage))
    } else {
        searchFetchGet(login, order, currentPage, per_page)
            .then(users => showUsers(users, per_page, currentPage))
    }
})


const addFavorite = (id) => {
    console.log(gotUsers)
    var favoriteUser = gotUsers.filter(item => item.id == id)
    var user = localStorage.getItem('users')
    user = JSON.parse(user)
    
    if (user) {
        var alreadyExist = user.filter(item => item.id == id)
        if (alreadyExist.length) return alert('Пользователь уже добавлен')  
        favoriteAllUsers = [...user, ...favoriteUser]
        localStorage.setItem('users', JSON.stringify(favoriteAllUsers))
    } else {
        localStorage.setItem('users', JSON.stringify(favoriteUser))
    }

    const login = document.querySelector('#searchInput').value
    const order = document.querySelector('.form-select-sort').value
    const count = document.querySelector('#inputPerpage').value
    const per_page = document.querySelector('.per-page').value
    searchFetchGet(login, order, currentPage, per_page)
        .then(users => showUsers(users, count, currentPage))
}

const showRep = () => {
    var user = localStorage.removeItem('users')
}