import * as util from './repo/general-repo.js';
import * as attachmentsRepo from "./repo/attachments-repo.js";

const attachmentsList = document.querySelector('#attachmentsList');
const submitBtn = document.querySelector('#addAttachment');
const Logo = document.querySelector('#Himg');
const form = document.querySelector('form')

let appID = localStorage.getItem('applicationID')
let username = localStorage.getItem('username')
let status = localStorage.Status

form.action = `api/account/${username}/${appID}/attachments`

Logo.addEventListener('click', util.goMain);
submitBtn.addEventListener('click', isSubmittable);

await loadAttachments();

function isSubmittable(event){
    if (status == "Rejected" || status == "Accepted" || status == "Withdrawn") {
        alert(`Cannot Add Attachments To This Application Because It Status is ${status}`)
        event.preventDefault();
    }
}


async function loadAttachments() {
    let attachmentArray = []
    let attachments = await attachmentsRepo.getAllAttachments(appID)
    for (let attachment of attachments) {
        attachmentArray.push(attachment);
    }
    let htmlTxt = attachmentArray.map(attachment => toHtml(attachment)).join('');
    attachmentsList.innerHTML = `        <thead>
        <tr>
            <td>Attachment Number</td>
            <td>Attachment Name</td>
            <td>Delete</td>
        </tr>
        </thead>
        <tbody>
        <!-- inject here-->
        </tbody>` + htmlTxt;
}

function toHtml(attachment) {
    let flag = (localStorage.username != "admin" && attachment.writtenBy == "admin");
    console.log(attachment)
    return `
    <tr> 
        <td>
            <h2>${attachment._id}</h2>
        </td>
        <td>
            <a href="${attachment.path}" target="_blank" >${attachment.path.split('/')[2].split('__')[1]}</a>
        </td>
        <td>
           <button onclick="DeleteAttach(event,'${attachment._id}')" ${flag ? "disabled" : ""}> <i class="fa fa-trash"></i> Delete </button>
        </td>
    </tr>`
}

window.DeleteAttach = DeleteAttach;

async function DeleteAttach(event, id) {
    event.preventDefault()
    console.log("DELETE ATT");
    if (status == "Rejected" || status == "Accepted" || status == "Withdrawn") {
        alert(`Cannot Delete This Attachment Because Application Status is ${status} `)
    }else {
        let result = confirm("Want to Delete the Attachment ?");
        if (result) { await attachmentsRepo.deleteAttachment(id) }
    }
    await loadAttachments();
}


// let result = confirm("Want to Delete the Att?");
// if (result) {
//     await attachmentsRepo.deleteAttachment(id)
// }