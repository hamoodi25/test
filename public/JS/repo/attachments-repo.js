
const attachmentsStoreName = 'attachments';  // Name of your collection of documents

export async function addAttachment(attachment){
    let url = `/api/account/${localStorage.username}/${localStorage.applicationID}/attachments` ;
    return await fetch(url,
        {
            method: 'POST',
            headers: {'Content-Type': "application/json",},
            body: JSON.stringify(attachment)
        });

}

export async function getAllAttachments(appID) {
    let url = `/api/account/${localStorage.username}/${localStorage.applicationID}/attachments` ;
    const response = await fetch(url);
    console.log("HEREEEEEEEEEEEEEEEE") ;
    return response.json();

}
export async function deleteAttachment(id) {
    let url = `/api/account/${localStorage.username}/${localStorage.applicationID}/attachments?attId=${id}` ;
    return await fetch(url,
        {method: 'delete'});
}