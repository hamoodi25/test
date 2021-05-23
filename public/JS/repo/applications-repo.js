export async function addApplication(app) {
    return await fetch(`/api/account/${app.userId}/applications`,
        {
            method: 'POST',
            headers: {'Content-Type': "application/json",},
            body: JSON.stringify(app)
        });
}

//2
export async function getAllAplications(username) {
    let url = `/api/account/00/applications?username=${username}`;
    const response = await fetch(url);
    return response.json();
}

//3
export async function updateApplication(app) {
    return await fetch(`/api/account/${app.userId}/applications`,
        {
            method: 'PUT',
            headers: {'Content-Type': "application/json",},
            body: JSON.stringify(app)
        });
}

//4
export async function getApplication(id) {
    let url = `/api/account/00/applications?_id=${id}`;
    const response = await fetch(url);
    return response.json();
}

//6
export async function getAllApps() {
    let url = `/api/admin/applications/`;
    const response = await fetch(url);
    return response.json();
}

export async function filterByStatus(status) {
    let url = `/api/admin/applications?Status=${status}`;
    const response = await fetch(url);
    return response.json();
}

export async function filterByYear(year1 , year2 ) {
    let url = `/api/admin/applications?year1=${year1}&year2=${year2}`;
    const response = await fetch(url);
    return response.json()
}


