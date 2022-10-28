
drawTopNav();

function drawTopNav()
{
    topNavHtml = `
    <div class="navbar-brand" style="width: 200px">
        <a href="/" class="navbar-item" id="nav-home">
            <img src="/image/AC_logo_long_yj.png" alt="AC logo" width="170" height="70">
        </a>
        </div>
        <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-start is-active">
            <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
                소개
            </a>
            <div class="navbar-dropdown is-boxed">
                <a onclick="alert('준비중입니다.')" class="navbar-item" id="nav-owned-telescopes">
                동아리소개
                </a>
                <a href="/history" class="navbar-item" id="nav-setting-telescope">
                연혁
                </a>
                <a onclick="alert('준비중입니다.')" class="navbar-item" id="nav-setting-telescope">
                활동소개
                </a>
                <a href="/organization-chart" class="navbar-item" id="nav-setting-telescope">
                조직도
                </a>
                <a href="/rules" class="navbar-item" id="nav-setting-telescope">
                회칙
                </a>
                <a onclick="alert('준비중입니다.')" class="navbar-item" id="nav-setting-telescope">
                별지기소개
                </a>
            </div>
            </div>
            <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
                공지사항
            </a>
            <div class="navbar-dropdown is-boxed">
                <a href="/notice" class="navbar-item" id="nav-owned-telescopes">
                일반공지
                </a>
                <a href="/chasing/notice" class="navbar-item" id="nav-setting-telescope">
                관측공지
                </a>
            </div>
            </div>

            <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
                커뮤니티
            </a>
            <div class="navbar-dropdown is-boxed">
                <a href="/free-board" class="navbar-item" id="nav-owned-telescopes">
                자유게시판
                </a>
                <a href="/astro-event" class="navbar-item" id="nav-setting-telescope">
                천문학&천문소식
                </a>
                <a onclick="alert('준비중입니다.')" class="navbar-item" id="nav-setting-telescope">
                별지기소식
                </a>
                <a href="/gallery" class="navbar-item" id="nav-setting-telescope">
                갤러리
                </a>
                <a onclick="alert('준비중입니다.')" class="navbar-item" id="nav-setting-telescope">
                자료실
                </a>
            </div>
            </div>

            <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
                정보공개
            </a>
            <div class="navbar-dropdown is-boxed">
                <a onclick="alert('준비중입니다.')" class="navbar-item" id="nav-owned-telescopes">
                연간 예산회계
                </a>
            </div>
            </div>
        </div>

        <div class="navbar-end">
            <div class="navbar-item">
            <div class="buttons">
                <a href="user/signup" class="button is-primary" id="nav-sign-up" style="background-color: rgb(229, 221, 200);color: rgb(50, 50, 50);">
                <strong>회원가입</strong>
                </a>
                <a href="/user/signin" class="button is-light" id="nav-sign-in">
                로그인
                </a>
            </div>
            </div>
        </div>
        </div>

    `

    const favicon = `<link href="./image/icons/AClogoCroped.ico" rel="shortcut icon" type="image/x-icon">`
    $('head').append(favicon);
    $('.navbar.is-dark').append(topNavHtml);
}