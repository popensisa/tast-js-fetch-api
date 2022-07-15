
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
    const sort = document.querySelector('.sort-select-sortBy').value
    searchFetchGet(login, order, currentPage, per_page, sort)
        .then(users => showUsers(users, count, currentPage))
}

const showRep = () => {
    var user = localStorage.removeItem('users')
}