
const fetchGet = async (order, currentPage, per_page, sort) => {
    var users = await fetch(`https://api.github.com/search/users?q=repos:>0&per_page=${per_page}&page=${currentPage}&order=${order}&sort=${sort}`)
        .then(res => res.json())
    return users
}
const searchFetchGet = async (login, order, currentPage, per_page, sort) => {
    var users = await fetch(`https://api.github.com/search/users?q=${login}&per_page=${per_page}&page=${currentPage}&order=${order}&sort=${sort}`)
        .then(res => res.json())
    return users
}
const fetchUserRep = async (login) => {
    var user = await fetch(`https://api.github.com/users/${login}/repos`)
        .then(res => res.json())
    return user
}
