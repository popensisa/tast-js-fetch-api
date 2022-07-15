

function orderBy(sel) {
    const order = sel.options[sel.selectedIndex].value
    const login = document.querySelector('#searchInput').value
    let currentPage = document.querySelector('.current-page').value
    const per_page = document.querySelector('.per-page').value 
    const sort = document.querySelector('.sort-select-sortBy').value

    if (login) {
        searchFetchGet(login, order, currentPage, per_page, sort)
            .then(users => showUsers(users, per_page, currentPage))
    } else {
        fetchGet(order, currentPage, per_page, sort)
            .then(users => showUsers(users, count, currentPage))
    }
}

function sortBySom(sort) {
    const sortBy = sort.value
    console.log(sortBy)
    const login = document.querySelector('#searchInput').value
    const count = document.querySelector('#inputPerpage').value
    let currentPage = document.querySelector('.current-page').value
    const per_page = document.querySelector('.per-page').value 
    const order = document.querySelector('.form-select-sort').value

    if (login) {
        searchFetchGet(login, order, currentPage, per_page, sortBy)
            .then(users => showUsers(users, per_page, currentPage))
    } else {
        fetchGet(order, currentPage, per_page, sortBy)
            .then(users => showUsers(users, count, currentPage))
    }
}