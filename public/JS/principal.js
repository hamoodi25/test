import * as util from './repo/general-repo.js' ;
import * as AccountsRepo from './repo/accounts-repo.js'
import * as AppRepo from './repo/applications-repo.js';

const FilterByStatus = document.querySelector("#Status");
const FilterByYear = document.querySelector("#SacademicYear");
const FilterByYearEnd = document.querySelector("#EacademicYear");
const CurrentYear = document.querySelector("#SetacademicYear1");
const CurrentYearEnd = document.querySelector("#SetacademicYear2");
const Logo = document.querySelector("#Himg");
const Table = document.querySelector('tbody');

Logo.addEventListener('click', util.goPrincipleMain);
CurrentYear.addEventListener('change', Setyear)
FilterByStatus.addEventListener('change', FilterByStatusHandler)
FilterByYear.addEventListener('change', filteryear);
FilterByYearEnd.addEventListener('change', filteryear);

// The current AY
let adminAcc = await AccountsRepo.getAdmin();
CurrentYearEnd.disabled = true;
CurrentYear.value = adminAcc['AY'];
CurrentYearEnd.value = adminAcc['AY'] + 1;
console.log(adminAcc);

let allApps = await AppRepo.getAllApps();
displayAll(allApps);


// TODO : change the default to ALL Statuse
FilterByYear.value = adminAcc['AY'];
FilterByYearEnd.value = adminAcc['AY'] + 1;

filteryear();


async function Setyear(event) {
    adminAcc['AY'] = parseInt(CurrentYear.value);
    CurrentYearEnd.value = adminAcc['AY'] + 1;
    await AccountsRepo.updateAdmin(adminAcc);
}

function displayAll(x) {
    let txt = x.map(w => applicationToHTML(w)).join("\n");
    Table.innerHTML = txt;
}

function applicationToHTML(app) {
    return `<tr class="LINKED" onclick="TEST('${app._id}')">
    <td>${app._id}</td>
    <td>${app.username}</td>
    <td>${app.AY} - ${app.AY + 1}</td>
    <td>${new Date(app.date).toISOString().slice(0, 10)}</td>
    <td>${app.firstName}</td>
    <td>${app.Status}</td>
</tr> 
`;
}

window.TEST = TEST;

function TEST(x) {
    localStorage.applicationID = x;
    window.location.href = './principal-view.html'

}

// Filter by Status
async function FilterByStatusHandler() {
    FilterByYear.value = ""
    FilterByYearEnd.value = ""
    let temp;
    console.log(FilterByStatus.value)
    temp = await AppRepo.filterByStatus(FilterByStatus.value)
    displayAll(temp)
}

// Filter by start year
async function filteryear() {
    let startYear = parseInt(FilterByYear.value);
    let endYear = parseInt(FilterByYearEnd.value);
    startYear = isNaN(startYear) ? -1 : startYear;
    endYear = isNaN(endYear) ? 1000000 : endYear;
    console.log(startYear, endYear)
    let temp = await AppRepo.filterByYear(startYear, endYear)
    console.log(temp)
    FilterByStatus.value = 'all'
    displayAll(temp)
}

