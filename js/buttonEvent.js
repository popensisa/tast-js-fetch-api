
const addFavorite = (id) => {
   
    var favoriteUser = gotUsers.items.filter(item => item.id == id)
    var user = localStorage.getItem('users')
    user = JSON.parse(user)
      
    if (user) {
        var alreadyExist = user.filter(item => item.id == id)  
        if (alreadyExist.length) return alert ('УЖЕ ДОБАВЛЕН')
        favoriteAllUsers = [...user, ...favoriteUser]
        localStorage.setItem('users', JSON.stringify(favoriteAllUsers))
    } else {
        localStorage.setItem('users', JSON.stringify(favoriteUser))
    }

    const login = document.querySelector('#searchInput').value
    const currentPage = document.querySelector('#inputCurrentPage').value
    const per_page = document.querySelector('.per-page').value
    
    if (login) {
            showUsers(gotUsers, per_page, currentPage)
    } else {
            showUsers(gotUsers, per_page, currentPage)
            
    }
}

const showRepository = (id) => {
    user = gotUsers.items.filter(item => item.id == id)

    fetchUserRepository(user[0].login)
        .then(user => {
            localStorage.setItem('userRepository', JSON.stringify(user))
        }).then(() => window.location.href = 'repository.html')
}