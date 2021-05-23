import * as AppRepo from './repo/applications-repo.js'
import * as util from './repo/general-repo.js' ;

const Logo = document.querySelector('#Himg');
const FName = document.querySelector('#firstName');
const LName = document.querySelector('#lastName') ;
const DOB = document.querySelector('#DoB');
const gender = document.querySelector('#Gender')
const CurrentSchool = document.querySelector('#CurrentSchoolGrade') ;
const ApplyGrade = document.querySelector('#GradeApplyingFor');
const resident = document.querySelector('#Resident');

Logo.addEventListener('click', util.goMain);
let app = await AppRepo.getApplication(localStorage.getItem('applicationID'))

await view(app)

export async function view(app) {
    FName.value = app.firstName;
    LName.value = app.lastName;
    DOB.value = new Date(app.dateOfBirth).toISOString().slice(0,10);
    gender.value = app.gender;
    CurrentSchool.value = app.currentSchoolGrade;
    ApplyGrade.value = app.gradeApplyingFor;
    resident.value = app.Resident;
}






