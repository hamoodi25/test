import * as AppRepo from './repo/applications-repo.js'
import * as util from './repo/general-repo.js';

const FName = document.querySelector('#firstName');
const LName = document.querySelector('#lastName') ;
const DOB = document.querySelector('#DoB');
const genderR = document.querySelector('input[class=gender]')
const CurrentSchool = document.querySelector('#CurrentSchoolGrade') ;
const ApplyGrade = document.querySelector('#GradeApplyingFor');
const residentR = document.querySelector('input[class=resident]');
const SubmitBtn = document.querySelector('#submit');

let app = await AppRepo.getApplication(localStorage.getItem('applicationID'))
view(app)

SubmitBtn.addEventListener('click', saveApplication );

function view(app) {

    FName.value = app.firstName;
    LName.value = app.lastName;
    DOB.value = date(app.dateOfBirth);
    genderR.checked = app.gender;
    CurrentSchool.value = app.currentSchoolGrade;
    ApplyGrade.value = app.gradeApplyingFor;
    residentR.checked = app.Resident;
}

async function saveApplication(event){
    // make sure all inputs are filled
    const form = event.target.form;
    const isFormValid = form.checkValidity();
    if(!isFormValid) return;

    event.preventDefault() ;

    let gender = (genderR.checked == true) ? "male":"female"
    let resident = (residentR.checked == true) ? "yes":"no"

    app.firstName = FName.value
    app.lastName = LName.value
    app.dateOfBirth = DOB.value
    app.gender = gender
    app.currentSchoolGrade = CurrentSchool.value
    app.gradeApplyingFor = ApplyGrade.value
    app.Resident = resident
    await AppRepo.updateApplication(app)
    util.goMain()
}

function date( date ) {
    let d = new Date(date);
    let day = ("0" + d.getDate()).slice(-2);
    let month = ("0" + (d.getMonth() + 1)).slice(-2);

    return  d.getFullYear()+"-"+(month)+"-"+(day) ;
}
localStorage.removeItem('applicationID')