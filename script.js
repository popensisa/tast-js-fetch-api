const pag = document.querySelector('.pagination')
const login = document.querySelector('#searchInput').value
const order = document.querySelector('.form-select-sort').value
const per_page = document.querySelector('.per-page').value
const sort = document.querySelector('.sort-select-sortBy').value

let currentPage = 1
let count = 4
var gotUsers = []

fetchGet(order, currentPage, per_page, sort)
    .then(users => {
        showUsers(users, count, currentPage)
        users.items.map(item => gotUsers.push(item))
    })


const showUsers = (users, count, currentPage) => {
    var loader = document.querySelector('.loader')
    const content = document.querySelector('.content-users')
   
    let totalUsers = users.total_count
    let totalPages = Math.ceil(totalUsers / count)
    pagination(currentPage, totalPages)

    content.innerHTML = ``
    if (users) {
        let i
        var user = localStorage.getItem('users')
        user = JSON.parse(user)

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
                                <a href='${users.items[i].html_url}'>link to github</a>
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
