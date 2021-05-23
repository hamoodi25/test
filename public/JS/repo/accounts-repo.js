
export async function addAccount(account) {
    return await fetch('/api/login',
        {
            method: 'POST',
            headers: {'Content-Type': "application/json",},
            body: JSON.stringify(account)
        });
}

export async function uniqeUserName(username) {
    let url = '/api/login?unique=';
    url += `${username}`;
    const response = await fetch(url);
    return response.json();
}

export async function isAuthorized(username, password) {
    let url = '/api/login?username=';
    url += `${username}&password=${password}`;
    const response = await fetch(url);
    return response.json();
}

export async function getAccount(username) {
    let url = `api/account/00?username=${username}` ;
    const response = await fetch(url);
    return response.json();

}

export async function getAccountByID(id) {
    let url = `api/account/${id}`;
    const response = await fetch(url);
    return response.json();
}

export async function deleteAccount(username) {
    return await fetch(`/api/account/00?username=${username}`,
        {method: 'delete'});

}

export async function getAdmin(){
    let url = `api/admin`;
    const response = await fetch(url);
    return response.json();

}

export async function updateAdmin(admin) {
    return await fetch('/api/admin',
        {
            method: 'PUT',
            headers: {'Content-Type': "application/json",},
            body: JSON.stringify(admin)
        });
}