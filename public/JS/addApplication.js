import * as util from './repo/general-repo.js';
import * as AppRepo from './repo/applications-repo.js';
import * as AccountsRepo from './repo/accounts-repo.js';


const FName = document.querySelector('#firstName');
const LName = document.querySelector('#lastName') ;
const DOB = document.querySelector('#DoB');
const genderR = document.querySelector('input[class=gender]')
const CurrentSchool = document.querySelector('#CurrentSchoolGrade') ;
const ApplyGrade = document.querySelector('#GradeApplyingFor');
const residentR = document.querySelector('input[class=resident]');
const SubmitBtn = document.querySelector('#submit');
const Logo = document.querySelector('#Himg');

Logo.addEventListener('click', util.goHome) ;
SubmitBtn.addEventListener('click', saveApplication );

async function saveApplication(event){
    // make sure all inputs are filled
    const form = event.target.form;
    const isFormValid = form.checkValidity();
    if(!isFormValid) return;

    event.preventDefault() ;

    let gender = (genderR.checked == true) ? "male":"female"
    let resident = (residentR.checked == true) ? "yes":"no"
    const adminAcc =await AccountsRepo.getAdmin()
    let userId = (await AccountsRepo.getAccount(localStorage.username)).userId
    console.log(userId)
    let application = {
        firstName : FName.value,
        lastName : LName.value,
        dateOfBirth : DOB.value,
        gender : gender ,
        currentSchoolGrade: CurrentSchool.value,
        gradeApplyingFor : ApplyGrade.value,
        Resident: resident,
        Status : "Submitted",
        userId:userId,
        AY : adminAcc['AY'],
        date : Date.now()
    }

    await AppRepo.addApplication(application) ;
    window.location.href ="./applications.html" ;
}


