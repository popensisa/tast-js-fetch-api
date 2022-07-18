

const showFavoriteUsers = () => {
    var favorite = document.querySelector('.favorites-items')
    var wrapperButtonDelete = document.querySelector('.btn-delete')

    var favoriteUsers = localStorage.getItem('users')
    var favoriteUsers = JSON.parse(favoriteUsers)
    
    favorite.innerHTML = ``
    wrapperButtonDelete.innerHTML = ``
    if (favoriteUsers) {
        let i
        for (i in favoriteUsers) {
            favorite.innerHTML += `
            <div class="card my-2" style="width: 100%;">
                <div class="card-body d-flex justify-content-between align-items-center flex-wrap">
                    <div class="about-user d-flex flex-wrap">
                        <img src="${favoriteUsers[i].avatar_url}" width='100px' alt="Фотка пользователа">
                        <div class="about-user-text mx-2 d-flex flex-column justify-content-evenly flex-wrap">
                            <h3 class='login'>${favoriteUsers[i].login}</h3>
                            <a href='${favoriteUsers[i].html_url}'>link to github</a>
                        </div>
                    </div>
                    <div class="btns d-flex flex-column my-2">
                        <button onclick='removeFavoriteItem(${favoriteUsers[i].id})' type="button" class="btn btn-success mb-2">Add favorite</button>
                        <button onclick='showRepository(${favoriteUsers[i].id})' type="button" class="btn btn-secondary">Show repository</button>
                    </div>
                </div>
            </div> 
            `
            wrapperButtonDelete.innerHTML = `
            <button class="btn btn-danger m-4" onclick="deleteAllFavorite()">Delete all</button>
            `
        }
    } else {
        favorite.innerHTML = `<h1>Добавьте пользователей</h1>`
    }
}
showFavoriteUsers()

const removeFavoriteItem = (id) => {
    var users = localStorage.getItem('users')
    users = JSON.parse(users)
    users = users.filter(item => item.id != id)
    if(users.length) {
        localStorage.setItem('users', JSON.stringify(users))
    } else {
        localStorage.removeItem('users')
    }
    showFavoriteUsers()
}

function deleteAllFavorite () {
    localStorage.removeItem('users')
    showFavoriteUsers()
}

const showRepository = (id) => {
    var usersAll = localStorage.getItem('users')
    usersAll = JSON.parse(usersAll)
    user = usersAll.filter(item => item.id == id)

    fetchUserRepository(user[0].login)
        .then(user => {
            localStorage.setItem('userRepository', JSON.stringify(user))
        }).then(() => window.location.href = 'repository.html')
}