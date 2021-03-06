const navHome = document.getElementById("nav-home");
const navAboutUs = document.getElementById("nav-aboutus");
const navChasingHistory = document.getElementById("nav-chasinghistory");
const navSignUp = document.getElementById("nav-sign-up");
const navSignIn = document.getElementById("nav-sign-in");

const navOwnedTelescopes = document.getElementById("nav-owned-telescopes");
const navSettingTelescopes = document.getElementById("nav-setting-telescope");

// const navContentsOwnedTelescopes = document.getElementById("nav-contents-owned-telescopes");
// const navContentsSettingTelescopes = document.getElementById("nav-contents-setting-telescope");

navHome.addEventListener('click', (event) => {
    location.href = '/'
})

navAboutUs.addEventListener('click', (event) => {
    location.href = '/'
})

navChasingHistory.addEventListener('click', (event) => {
    location.href = '/chasing-history'
})

navSignUp.addEventListener('click', (event) => {
    location.href = '/user/signup'
})

navSignIn.addEventListener('click', (event) => {
    location.href = "/user/signin"
})

//======
navOwnedTelescopes.addEventListener('click', (event) => {
    location.href = '/telescopes/owned'
})

navSettingTelescopes.addEventListener('click', (event) => {
    location.href = '/telescopes/manual'
})

// navContentsOwnedTelescopes.addEventListener('click', (event) => {
//     location.href = '/telescopes/owned'
// })

// navContentsSettingTelescopes.addEventListener('click', (event) => {
//     location.href = '/telescopes/manual'
// })
