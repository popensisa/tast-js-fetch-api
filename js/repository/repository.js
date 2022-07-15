

function fillRepository() {
    const aboutUser = document.querySelector('.about-user')
    const userRep = document.querySelector('.repositories')


    const user = localStorage.getItem('userRep')

    if (user) {
        aboutUser.innerHTML = `
        <div class="card my-2" style="width: 100%;">
            <div class="card-body d-flex justify-content-between align-items-center flex-wrap">
                <div class="about-user d-flex justify-content-center flex-wrap">
                    <img src="${user[i].avatar_url}" width='100px' alt="Фотка пользователа">
                    <div class="about-user-text mx-2 d-flex flex-column justify-content-evenly flex-wrap">
                        <h3 class='login'>${user[i].login}</h3>
                        <a href='${user[i].url}'>link to github</a>
                    </div>
                </div>
                <div class="btns d-flex flex-column my-2">
                    <button onclick='removeFavoriteItem(${user[i].id})' type="button" class="btn btn-success mb-2">Add favorite</button>
                </div>
            </div>
        </div> 
        `
        userRep.innerHTML = `
            
        `
    }
}