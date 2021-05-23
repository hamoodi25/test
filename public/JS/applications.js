import * as util from './repo/general-repo.js';
import * as AppRepo from './repo/applications-repo.js';
import * as AccountsRepo from './repo/accounts-repo.js'

window.viewApp = viewApp;
window.editApp = editApp;
window.addAttachments = addAttachments;
window.withdraw = withdraw;
window.resubmit = resubmit;

const table = document.querySelector('tbody');
const Logo = document.querySelector('#Himg');


Logo.addEventListener('click', util.goMain);

await updatePage();

async function updatePage() {
    let appArray = []
    let username = localStorage.username;
    let apps = await AppRepo.getAllAplications(username);
    for (let app of apps) {
        appArray.push(app);
    }
    let htmlTxt = appArray.map(app => toHtml(app)).join('');
    table.innerHTML = htmlTxt;
}
async function viewApp(id) {
    localStorage.setItem('applicationID',id);
    await AppRepo.getApplication(id)
    util.view()
}

async function editApp(id) {
    localStorage.setItem('applicationID',id);
    let app = await AppRepo.getApplication(id);
    if (app.Status != "Rejected" && app.Status!= "Accepted" && app.Status!= "Withdrawn") {
        util.edit()
    }
    else{
        alert(`Application Number ${id} have been ${app.Status} So You Cannot modify it`)
    }
}

async function addAttachments(id) {
    localStorage.setItem('applicationID',id);
    let app = await AppRepo.getApplication(id);
    localStorage.Status = app.Status
    util.attachment()
}


async function withdraw(id) {
    let app = await AppRepo.getApplication(id);
    if (app.Status != "Rejected" && app.Status!= "Accepted" && app.Status!= "Withdrawn") {
        let result = confirm("Want to Withdraw?");
        if (result) {
            app.Status = "Withdrawn";
            await AppRepo.updateApplication(app)
            location.reload();
        }
    }
    else{
        alert(`Application Number ${id} have been ${app.Status} So You Cannot modify it`)
    }
}

async function resubmit(id){
    let app = await AppRepo.getApplication(id);
    let admin = await AccountsRepo.getAdmin() ;
    if (app.Status === "Rejected" || app.Status === "Withdrawn" ){
        let application = app;
        application.AY = admin['AY'] ;
        application.date = Date.now() ;
        delete application._id;
        application.Status = "Submitted"
        await AppRepo.addApplication(application);
        location.reload()
    }
    else{
        alert(`You can resubmit Application Number ${id} only if it was Rejected`)
    }
}

function toHtml(app) {
    console.log(app)
    return `
       <tr>
            <td>${app._id}</td>
            <td>${app.AY} - ${app.AY+1} </td>
            <td>${new Date(app.date).toISOString().slice(0,10)}</td>
            <td >${app.Status}</td>
            <td class="eventColumn">
                <button onclick="viewApp('${app._id}')"><i class="fa fa-eye">View</i></button>&nbsp;
                <button onclick="editApp('${app._id}')"><i class="fa fa-edit">Edit</i></button>&nbsp;
                <button disabled><i class="fa fa-plus">Add Notes</i></button>&nbsp;
                <button onclick="addAttachments('${app._id}')"><i class="fa fa-plus">Attachments</i></button>&nbsp;
                <button disabled><i class="fa fa-eye">View Tests</i></button>&nbsp;
                <button onclick="withdraw('${app._id}')"><i class="fa fa-minus">Withdraw</i></button>&nbsp;
                <button onclick="resubmit('${app._id}')"
                ${app.Status === "Rejected" || app.Status === "Withdrawn" ? "" :"disabled"}
                ><i class="fa fa-retweet">Resubmit</i></button>&nbsp;
            </td>
        </tr> 
    `
}

