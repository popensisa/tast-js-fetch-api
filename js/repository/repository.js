
function fillRepository() {
    var aboutUser = document.querySelector('.about-user')
    var userRep = document.querySelector('.repositories')
    userRep.innerHTML = ``

    var userRepository = localStorage.getItem('userRepository')
    userRepository = JSON.parse(userRepository)

    var user = localStorage.getItem('users')
    user = JSON.parse(user)

    if (userRepository) {
        foundUser = user && user.filter(item => item.id == userRepository[0].owner.id)
        aboutUser.innerHTML = `
        <div class="card my-2" style="width: 100%;">
            <div class="card-body d-flex justify-content-between align-items-center flex-wrap">
                <div class="about-user d-flex flex-wrap">
                    <img src="${userRepository[0].owner.avatar_url}" width='100px' alt="Фотка пользователа">
                    <div class="about-user-text mx-2 d-flex flex-column justify-content-evenly flex-wrap">
                        <h3 class='card-title login'>${userRepository[0].owner.login}</h3>
                        <a href='${userRepository[0].owner.url}'>link to github</a>
                    </div>
                </div>
                <div class="btns d-flex justify-content-center my-2">
                <button onclick='addFavoriteFromRepository(${JSON.stringify(userRepository[0].owner)})' type="button" class="${foundUser ? 'btn btn-success mb-2' : 'btn btn-secondary mb-2'}">Add favorite</button>
                </div>
            </div>
        </div> 
        `
    
        let i 
        for(i in userRepository){
            userRep.innerHTML += `
            <div class="card my-2" style="width: 100%;">
                <div class="card-body d-flex justify-content-between align-items-center flex-wrap">
                    <div class="about-user d-flex justify-content-center flex-wrap">
                        <div class="about-user-text mx-2 d-flex flex-column justify-content-evenly flex-wrap">
                            <h3 class='card-title login'>${userRepository[i].name}</h3>
                        </div>
                    </div>
                    <div class="btns d-flex justify-content-center my-2">
                        <button type="button" class="btn btn-secondary mb-2">Go to github</button>
                    </div>
                </div>
            </div> 
            `
        }
    }
}

fillRepository()

function addFavoriteFromRepository (userRepository) {

    var user = localStorage.getItem('users')
    user = JSON.parse(user)

    if (user) {
        var alreadyExist = user.filter(item => item.id == userRepository.id)  
        if (alreadyExist.length) {
            var users = user.filter(item => item.id !== alreadyExist[0].id)
            users.length ? localStorage.setItem('users', JSON.stringify(users)) : localStorage.removeItem('users')
            fillRepository()
        }
    } else {
        favoriteOneUsers = [userRepository]
        localStorage.setItem('users', JSON.stringify(favoriteOneUsers))
        fillRepository()
    }
}