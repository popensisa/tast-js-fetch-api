let currentPage = 1
let count = 4

const fetchGet = async () => {
    var users = await fetch('https://api.github.com/users?per_page=10')
        .then(res => res.json())
    return users
}

fetchGet()
    .then(users => showUsers(users, count, currentPage))

function myNewFunction(sel) {
    const sort = sel.options[sel.selectedIndex].value
    const count = document.querySelector('#inputPerpage').value
    if (sort == 'asc') {
        fetchGet()
            .then(users => users.sort((a, b) => a.id - b.id))
            .then(users => showUsers(users, count, currentPage))
    } else {
        fetchGet()
            .then(users => users.sort((a, b) => b.id - a.id))
            .then(users => showUsers(users, count, currentPage))
    }
}


function nextPage() {
    currentPage++
    const count = document.querySelector('#inputPerpage').value
    fetchGet()
        .then(users => showUsers(users, count, currentPage))
}
function prevPage() {
    currentPage--
    const count = document.querySelector('#inputPerpage').value
    fetchGet()
        .then(users => showUsers(users, count, currentPage))
}


const showUsers = (users, count) => {
    var loader = document.querySelector('.loader')
    const content = document.querySelector('.content-users')

    let indexOfLast = currentPage * count
    let indexOfFirst = indexOfLast - count
    let totalUsers = users.length
    let totalPages = Math.ceil(totalUsers / count)

    pagination(currentPage, totalPages)

    users = users.slice(indexOfFirst, indexOfLast)
    content.innerHTML = ``
    if (users[0]?.login) {
        let i
        for (i in users) {
            content.innerHTML += `
            <div class="card my-2" style="width: 100%;">
                <div class="card-body d-flex justify-content-between align-items-center flex-wrap">
                    <div class="about-user d-flex justify-content-center">
                        <img src="${users[i].avatar_url}" width='100px' alt="Фотка пользователа">
                        <div class="about-user-text mx-2 d-flex flex-column justify-content-evenly">
                            <h3 class='login'>${users[i].login}</h3>
                            <a href='${users[i].url}'>link to github</a>
                        </div>
                    </div>
                    <div class="btns d-flex flex-column">
                        <button type="button" class="btn btn-secondary mb-2">Add favorite</button>
                        <button type="button" class="btn btn-secondary">Show repository</button>
                    </div>
                </div>
            </div> 
            `
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
            <input value="${currentPage}/${totalPages}" maxlength="2" type="text" id="inputCurrentPage" class="form-input current-page mx-2" disabled>
        <button type="button" onclick='nextPage()' class="next-page btn btn-light font-weight-bold">next→</button>
    `
}



document.querySelector('#searchInput').oninput = function () {
    let value = this.value.trim().toLowerCase()
    let card = document.querySelectorAll('.card')
    if (value != '') {
        card.forEach(elem => {
            let login = elem.querySelector('.login')
            if (login.innerHTML.toLowerCase().search(value) == -1) {
                elem.classList.add('done')
            } else {
                elem.classList.remove('done')
            }
        })
    } else {
        card.forEach(elem => {
            elem.classList.remove('done')
        })
    }
}

const countPerPage = document.querySelector('#inputPerpage').addEventListener('change', function () {
    var val = this.value
    fetchGet()
        .then(users => showUsers(users, val, currentPage))
})

