

function orderBy(sel) {
    const order = sel.options[sel.selectedIndex].value
    const login = document.querySelector('#searchInput').value
    let currentPage = document.querySelector('.current-page').value
    const per_page = document.querySelector('.per-page').value 
    const sort = document.querySelector('.sort-select-sortBy').value

    searchFetchGet(login, order, currentPage, per_page, sort)
        .then(users => {
            showUsers(users, per_page, currentPage)
            users.items.map(item => gotUsers.push(item))
        })
}

function sortBySom(sort) {
    const sortBy = sort.options[sort.selectedIndex].value
    const login = document.querySelector('#searchInput').value
    const count = document.querySelector('#inputPerpage').value
    let currentPage = document.querySelector('.current-page').value
    const per_page = document.querySelector('.per-page').value 
    const order = document.querySelector('.form-select-sort').value

    searchFetchGet(login, order, currentPage, per_page, sortBy)
        .then(users => {
            showUsers(users, count, currentPage)
            users.items.map(item => gotUsers.push(item))
        })
}