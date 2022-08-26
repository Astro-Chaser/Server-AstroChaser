const clubIntroBtn = document.getElementById("club-intro-btn");
const navBarHamberger = document.getElementById('mobile-nav-bar-hamburger');
const navBarArea = document.getElementsByClassName('mobile-nav-bar-area')[0];

clubIntroBtn.onclick = function openIntro() {
    var x = document.getElementById("activity-page");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
      location.href="#activity-page";   
    }
}

window.addEventListener("scroll", function(event) {
  
  var top = this.scrollY;

  navBarArea.style.backgroundColor = `rgba(0, 0, 0, ${(top/600000)*1000})`

}, false);