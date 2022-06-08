const navHome = document.getElementById("nav-home");
const navAboutUs = document.getElementById("nav-aboutus");
const navChasingHistory = document.getElementById("nav-chasinghistory");
const navOwnedTelescopes = document.getElementById("nav-owned-telescopes");
const navSettingTelescopes = document.getElementById("nav-setting-telescope");
const navSignUp = document.getElementById("nav-sign-up");

navHome.addEventListener('click', (event) => {
    location.href = '/'
})

navAboutUs.addEventListener('click', (event) => {
    location.href = '/'
})

navChasingHistory.addEventListener('click', (event) => {
    location.href = '/'
})

navOwnedTelescopes.addEventListener('click', (event) => {
    location.href = '/telescopes/owned'
})

navSettingTelescopes.addEventListener('click', (event) => {
    location.href = '/telescopes/manual'
})

navSignUp.addEventListener('click', (event) => {
    location.href = '/user/signup'
})

