

function orderBy(sel) {
    const order = sel.options[sel.selectedIndex].value
    const login = document.querySelector('#searchInput').value
    let currentPage = document.querySelector('.current-page').value
    const per_page = document.querySelector('.per-page').value 
    const sort = document.querySelector('.sort-select-sortBy').value

    if (login) {
        searchFetchGet(login, order, currentPage, per_page, sort)
            .then(users => {
                showUsers(users, per_page, currentPage)
                gotUsers = users
            })
    } else {
        fetchGet(order, currentPage, per_page, sort)
            .then(users => {
                showUsers(users, per_page, currentPage)
                gotUsers = users
            })
    }
}

function sortBySom(sort) {
    const sortBy = sort.value
    const login = document.querySelector('#searchInput').value
    let currentPage = document.querySelector('.current-page').value
    const per_page = document.querySelector('.per-page').value 
    const order = document.querySelector('.form-select-sort').value

    if (login) {
        searchFetchGet(login, order, currentPage, per_page, sortBy)
            .then(users => {
                showUsers(users, per_page, currentPage)
                gotUsers = users
            })
    } else {
        fetchGet(order, currentPage, per_page, sortBy)
            .then(users => {
                showUsers(users, per_page, currentPage)
                gotUsers = users
            })
    }
}