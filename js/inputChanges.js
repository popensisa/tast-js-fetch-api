
document.querySelector('#searchInput').addEventListener('change', function () {
    const login = this.value
    const order = document.querySelector('.form-select-sort').value
    const count = document.querySelector('#inputPerpage').value
    const per_page = document.querySelector('.per-page').value
    const sort = document.querySelector('.sort-select-sortBy').value
    
    if (login) {
        searchFetchGet(login, order, currentPage, per_page, sort)
            .then(users => {
                showUsers(users, count, currentPage)
                gotUsers = users
            })
    } else {
        fetchGet(order, currentPage, per_page, sort)
            .then(users => {
                showUsers(users, count, currentPage)
                gotUsers = users
            })
    }

})

const countPerPage = document.querySelector('#inputPerpage').addEventListener('change', function () {
    var per_page = this.value
    const order = document.querySelector('.form-select-sort').value
    var currentPage = document.querySelector('.current-page').value
    const login = document.querySelector('#searchInput').value
    const sort = document.querySelector('.sort-select-sortBy').value
    currentPage = currentPage.slice('/')[0]
    
    if (login) {
        searchFetchGet(login, order, currentPage, per_page, sort)
            .then(users => {
                showUsers(users, count, currentPage)
                gotUsers = users
            })
    } else {
        fetchGet(order, currentPage, per_page, sort)
            .then(users => {
                showUsers(users, count, currentPage)
                gotUsers = users
            })
    }
})