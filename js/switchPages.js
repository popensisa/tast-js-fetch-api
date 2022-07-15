
function nextPage() {
    const login = document.querySelector('#searchInput').value
    const order = document.querySelector('.form-select-sort').value
    const count = document.querySelector('#inputPerpage').value
    const per_page = document.querySelector('.per-page').value
    const sort = document.querySelector('.sort-select-sortBy').value
    currentPage = currentPage + 1
    if (login) {
        searchFetchGet(login, order, currentPage, per_page, sort)
            .then(users => showUsers(users, count, currentPage))
    } else {
        fetchGet(order, currentPage, per_page, sort)
            .then(users => showUsers(users, count, currentPage))
    }
}
function prevPage() {
    if(currentPage != 1) {
        const login = document.querySelector('#searchInput').value
        const order = document.querySelector('.form-select-sort').value
        const count = document.querySelector('#inputPerpage').value
        const per_page = document.querySelector('.per-page').value
        const sort = document.querySelector('.sort-select-sortBy').value
        currentPage = currentPage - 1
        if (login) {
            searchFetchGet(login, order, currentPage, per_page, sort)
                .then(users => showUsers(users, count, currentPage))
        } else {
            fetchGet(order, currentPage, per_page, sort)
                .then(users => showUsers(users, count, currentPage))
        }
    } 
    return 
}

function changePage(currentPage) {
    const order = document.querySelector('.form-select-sort').value
    const per_page = document.querySelector('.per-page').value
    const login = document.querySelector('#searchInput').value
    const sort = document.querySelector('.sort-select-sortBy').value
    if (login) {
        searchFetchGet(login, order, currentPage, per_page, sort)
            .then(users => showUsers(users, count, currentPage))
    } else {
        fetchGet(order, currentPage, per_page, sort)
            .then(users => showUsers(users, count, currentPage))
    }
}