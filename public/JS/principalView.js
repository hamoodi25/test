import * as AccountsRepo from './repo/accounts-repo.js'
import * as AppRepo from './repo/applications-repo.js'
import * as att from './attachments.js'

const attForm = document.querySelector('#attForm')
const StudentForm = document.querySelector('#viewForm') ;
const SIBTN = document.querySelector('#SIBTN') ;
const parentsInfo = document.querySelector('#parentsInfo') ;
const Status = document.querySelector('#Status') ;
// const attachmentsList = document.querySelector('#attachmentsList');


window.opentab=opentab

let appId = localStorage.applicationID;
let app = await AppRepo.getApplication(appId);
console.log("HI")
await fillInfo();


let appID = localStorage.getItem('applicationID')
let username = localStorage.getItem('username')
attForm.action = `api/account/${username}/${appID}/attachments`

SIBTN.click() ; //Students Information always appear

function opentab(evt, tabName) {
    let i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "") ;
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

async function fillInfo() {
    let account = await AccountsRepo.getAccountByID(app.userId);
    Object.values(StudentForm).forEach( (field) => {
        field.value = field.name != "" ? app[field.name] : field.value;
        if(field.name == "AY")
            field.value += ` - ${parseInt(field.value)+1}` ;
        else if(field.name == "ID")
            field.value = app['_id'];
        else if(field.name == "dateOfBirth")
            field.value = new Date(app['dateOfBirth']).toISOString().slice(0,10) ;
    })
    if(app.Status == "Withdrawn" )
    {
        Status.value = "Submitted"
        Status.disabled = true
        Status.children[0].innerHTML = "Withdrawn"
    }else
        Status.value = app.Status;
    console.log(parentsInfo)
    Object.values(parentsInfo).forEach( (field) => {
        field.value = field.name !== "" ? account[field.name] : field.value ;})
}

Status.onchange = async function(){
        let s = Status.value
        app.Status = s ;
        document.querySelector('#StatusTXT').value = s;
        await AppRepo.updateApplication(app);
    };