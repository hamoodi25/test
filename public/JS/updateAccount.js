import * as util from './repo/general-repo.js' ;
import * as AccountsRepo from './repo/accounts-repo.js'
import * as AppRepo from './repo/applications-repo.js';

const Logo = document.querySelector("#Himg") ;
const FName = document.querySelector("#fname") ;
const LName = document.querySelector("#lname") ;
const NationalID = document.querySelector("#NID") ;
const HomePhone = document.querySelector("#homePhone") ;
const Mobile = document.querySelector("#mobile") ;
const Email = document.querySelector("#email") ;
const Occupation = document.querySelector("#Occupation") ;
const NameofEmployer = document.querySelector("#nameofEmp") ;
const NextBtn = document.querySelector("#submitBtn") ;
const Container = document.querySelector("#Container") ;
const Legend = document.querySelector("#Legend") ;


let step = 1 ;
let account = await AccountsRepo.getAccount(localStorage.username);

fillPage();

Logo.addEventListener('click', util.goMain ) ;
NextBtn.addEventListener('click',NextBtnHandler) ;

async function NextBtnHandler(event) {
    const form = event.target.form;
    const isFormValid = form.checkValidity();
    if(!isFormValid) return;

    event.preventDefault() ;
    await saveData() ;
    await fillPage();

}


// function that inject HTML and Fill the page depending on step
async function fillPage(){
    if(step == 1){
        Legend.innerHTML = "Step 1: Father personal information";
        FName.value = account.fatherFirstName  ;
        LName.value = account.fatherLastName  ;
        NationalID.value = account.fatherNationalID ;
        HomePhone.value = account.fatherHomePhone ;
        Mobile.value =account.fatherMobile ;
        Email.value = account.fatherEmail  ;
        Occupation.value = account.fatherOccupation  ;
        NameofEmployer.value = account.fatherNameofEmployer  ;
        step = step+ 1;
    } else if( step == 2) {
        Legend.innerHTML = "Step 2: Mother personal information";
        Legend.classList.add("focus")
        FName.value = account.motherFirstName ;
        LName.value = account.motherLastName ;
        NationalID.value = account.motherNationalID ;
        HomePhone.value = account.motherHomePhone =
            Mobile.value =account.motherMobile  ;
        Email.value = account.motherEmail ;
        Occupation.value = account.motherOccupation;
        NameofEmployer.value = account.motherNameofEmployer ;
        step = step+ 1;
    } else if ( step == 3){
        Legend.classList.remove("focus")
        Legend.innerHTML = "Step 3: Final account information (Credentials)";
        let x = document.querySelector("#fnameLabel") ;
        x.innerHTML = "User Name*: " ;
        let y =document.querySelector("#lnameLabel")
        LName.type = "password"  ;
        y.innerHTML = "Password*: " ;
        let z =document.querySelector("#NIDLabel")
        NationalID.type =  "password" ;
        z.innerHTML = "Repeat Password*: " ;
        for (let i =0 ; i<10; i++) {
            Container.children[8].remove()  ;
        }
        FName.value = account.username ;
        LName.value = account.password ;
        NationalID.value = account.password ;
        NextBtn.value = 'Save' ;
        step = step+ 1;
    }else if (step== -1) {

        await AccountsRepo.addAccount( account ) ;
        // may need to chgane in other DB for application
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!MUST
        // change application and link them to the nwe account
        // await AppRepo.changeLink(localStorage.username, account.username)
        localStorage.username = account.username ;
        alert("Your account information has been updated successfully") ;
        window.location.href ="applications.html" ; // you can add a MSG that the account is created
    }

}



// function that saves the input data depending on step
async function saveData(){
    if (step ==2 ){
        account.fatherFirstName = FName.value ;
        account.fatherLastName = LName.value ;
        account.fatherNationalID = NationalID.value ;
        account.fatherHomePhone = HomePhone.value ;
        account.fatherMobile = Mobile.value ;
        account.fatherEmail = Email.value ;
        account.fatherOccupation = Occupation.value ;
        account.fatherNameofEmployer = NameofEmployer.value ;

    }else if( step == 3  ){
        account.motherFirstName = FName.value ;
        account.motherLastName = LName.value ;
        account.motherNationalID = NationalID.value ;
        account.motherHomePhone = HomePhone.value ;
        account.motherMobile = Mobile.value ;
        account.motherEmail = Email.value ;
        account.motherOccupation = Occupation.value ;
        account.motherNameofEmployer = NameofEmployer.value ;
    }else if(step == 4 ){
        // passwords Matches
        if( NationalID.value ===  LName.value ){
            // user names is unique
            let oldUser = account.username
            let oldPass = account.password
            await AccountsRepo.deleteAccount(localStorage.username);
            if( await AccountsRepo.uniqeUserName(FName.value)) {
                account.username= FName.value;
                account.password = NationalID.value;
                step = -1;
            }else{
                account.username= oldUser;
                account.password = oldPass;
                await AccountsRepo.addAccount(account) ;
                alert('This user name has already been used');
            }
        }
        else{
            alert('The passwords Do not match')
        }
    }
}

