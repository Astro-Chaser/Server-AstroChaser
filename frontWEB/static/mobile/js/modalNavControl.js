html = `
<div id="modal" class="modal-overlay">
        <div class="modal-window">
            <div class="title">
                <h2>Astro Chaser</h2>
            </div>
            <div class="close-area">X</div>
            <div class="content">
                <h3>소개</h3>
                <a href="/rules"><p style="margin-left:3vw">회칙</p></a>
                <a href="/history"><p style="margin-left:3vw">연혁</p></a>
                <a href="/organization-chart"><p style="margin-left:3vw">조직도</p></a>

                <h3>공지사항</h3>
                <a href="/notice"><p style="margin-left:3vw">일반공지</p></a>
                <a href="/chasing/notice"><p style="margin-left:3vw">관측공지</p></a>


                
            </div>
        </div>
    </div>
`

css = `
<style>
    #modal.modal-overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(1.5px);
        -webkit-backdrop-filter: blur(1.5px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);
    }
    #modal .modal-window {
        background: rgba( 255, 255, 255, 0.90 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 13.5px );
        -webkit-backdrop-filter: blur( 13.5px );
        border-radius: 10px;
        border: 1px solid rgba( 255, 255, 255, 0.18 );
        width: 400px;
        height: 500px;
        position: relative;
        margin-top: 5vh;
        padding: 10px;
    }
    #modal .title {
        padding-left: 10px;
        display: inline;
        text-shadow: 1px 1px 2px gray;
        color: black;
        
    }
    #modal .title h2 {
        display: inline;
    }
    #modal .close-area {
        display: inline;
        float: right;
        padding-right: 10px;
        cursor: pointer;
        text-shadow: 1px 1px 2px gray;
        color: black;
    }

    #modal .content {
        margin-top: 20px;
        padding: 0px 10px;
        text-shadow: 1px 1px 2px gray;
        color: black;
    }
</style>
`

$('head').append(css);
$('body').append(html);

const modal = document.getElementById("modal")
function modalOn() {
    modal.style.display = "flex"
}
function isModalOn() {
    return modal.style.display === "flex"
}
function modalOff() {
    modal.style.display = "none"
}
const btnModal = document.getElementById("mobile-nav-bar-hamburger")
btnModal.addEventListener("click", e => {
    modalOn();
    location.href = "#modal";
})
const closeBtn = modal.querySelector(".close-area")
closeBtn.addEventListener("click", e => {
    modalOff()
})
modal.addEventListener("click", e => {
    const evTarget = e.target
    if(evTarget.classList.contains("modal-overlay")) {
        modalOff()
    }
})
window.addEventListener("keyup", e => {
    if(isModalOn() && e.key === "Escape") {
        modalOff()
    }
})

const clubIntroBtn = document.getElementById("club-intro-btn");

clubIntroBtn.onclick = function openIntro() {
    var x = document.getElementById("activity-page");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
      location.href="#activity-page";   
    }
}