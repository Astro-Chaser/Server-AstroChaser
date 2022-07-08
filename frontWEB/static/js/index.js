let oldScrollTop=0,newScrollTop = 0, scrollPercent=0;
let imageAll;
let totalNum = 0;
let moveMouse, stars1, stars2, stars3, text3d, intoTheStars;
let x = 0;
let y = 0;
let mx = 0;
let my = 0;
let speed = 0.009;
let scrollCnt = 0;

var context, canvas;
var sattelliteStartScroll, sattellite;
var isIntoTheStarsEnd = false; 
const animalNames =[
  "강아지", "고양이", "고릴라", "침팬지", "갈매기", "비둘기", "호랑이", "야옹이", "폼폼이", "재경이", "이시형", "전준휘", "별지기", "송골매",
  "강호동", "남도일", "케로로", "호돌이", "코뿔소", "구렁이", "사다리", "북극곰", "탄지로", "뽀로로", "스컹크", "김동헌", "원숭이", "알파카"
]

window.onload = function(){

  stars1 = document.getElementById("stars1");
  stars2 = document.getElementById("stars2");
  stars3 = document.getElementById("stars3");
  text3d = document.getElementsByClassName("text3d")[0];
  intoTheStars = document.getElementById("intoTheStars");
  // sattellite = document.getElementById("sattelliteImg");

  window.addEventListener("mousemove", mouseFunc, false);

  // window.addEventListener('resize', stageResize, false);
  window.addEventListener('scroll', scrollFunc);
  function mouseFunc(e)
  {
    x = (e.clientX - window.innerWidth / 2);
    y = (e.clientY - window.innerHeight / 2);
  }
  loop();
  //랜덤 닉네임 생성하기
  console.log(getRandomArbitrary(0, animalNames.length));
  $("#guestbookCommit_nickname").attr("placeholder", "익명의 " + animalNames[getRandomArbitrary(0, animalNames.length)])

  //방명록 전시하기
  async function showGuestbookData(){
    const guestbookData = await getAPI(hostAddress, 'app/guestbook');
  
    console.log(guestbookData.result);
    for(var i=0; i<guestbookData.result.length; i++)
    {
      var writer = guestbookData.result[i].writer;
      var time = guestbookData.result[i].createdAt.substring(0,10) + " " + guestbookData.result[i].createdAt.substring(12,16);
      var message = guestbookData.result[i].content;

      var html ='';
      html=(`<div class="guestbook-area-contents">
              <div class="guestbook-writer-info-area">
                <div class="guestbook-writer-name-info">${writer}</div>
                <div class="guestbook-writer-time-info">${time}</div>
              </div>
              <div class="guestbook-user-content">${message}</div>                        
            </div>`)

      $(".guestbook-area").append(html);
    }
  }
  showGuestbookData();

  //방명록 게시하기
  const guestbookCommitBtn = document.getElementById("guestbookCommitBtn");
  guestbookCommitBtn.onclick = guestbookCommitBtnClicked;
}

function loop(){
  mx += (x - mx) * speed;
  my += (y - my) * speed;

  stars1.style.transform = "translate("+ (mx/10) +"px," + (my/10) +"px)";
  stars2.style.transform = "translate("+ -(mx/15) +"px," + -(my/15) +"px)";
  stars3.style.transform = "translate("+ (mx/8) +"px," + -(my/8) +"px)";
  intoTheStars.style.transform = "translate("+ (mx/15) +"px," + -(my/15) +"px)";
  // sattellite.style.transform = "translate("+ (mx) +"px," + (my) +"px)";

  //3d 텍스트 모션
  //rotate3d 속성
  text3d.style.transform = "translate3d("+ -(mx/5) +"px," + -(my/5) +"px,0) rotate3d(0,1,0,"+ -mx / 60 + "deg)";

  window.requestAnimationFrame(loop);
}

function scrollFunc(e) {
    newScrollTop = document.documentElement.scrollTop;
    scrollPercent = Math.ceil((newScrollTop/document.body.scrollHeight)*100);

    intoTheStars.style.opacity = (newScrollTop/(document.body.scrollHeight)*20);
    //console.log( intoTheStars.style.opacity);

    if(scrollPercent<=0.01) 
    {
      intoTheStars.style.opacity = 0;
      scrollCnt = 0;
    }
     
    if(newScrollTop-oldScrollTop>10)
    {
      scrollCnt += 1;
      //console.log(scrollCnt%40);
      drawIntoTheStars(scrollCnt%40);
    }
    else if(newScrollTop-oldScrollTop<-10 && scrollCnt>0)
    {
      scrollCnt -= 1;
      //console.log(scrollCnt%40);
      drawIntoTheStars(scrollCnt%40);
    }
    if(scrollCnt<100)
    {
      stars1.style.opacity = 1;
      stars2.style.opacity = 1;
      stars3.style.opacity = 1;
      intoTheStars.opacity = 1;
      text3d.style.opacity = 1;
    }
    else if(scrollCnt==100) intoTheStars.style.opacity=1;
    else if(scrollCnt>100)
    {
      stars1.style.opacity = 0;
      stars2.style.opacity = 0;
      stars3.style.opacity = 0;
      intoTheStars.opacity = 0;
      text3d.style.opacity = 0;
      intoTheStars.style.opacity = 1 - ((scrollCnt-100)*0.02);
      //console.log(intoTheStars.style.opacity);
    }
    oldScrollTop = newScrollTop;
}

function  drawIntoTheStars(i)
{
  document.getElementById('intoTheStars').src = "./image/Space Travel/IntoTheStars"+i+".jpg";
}

function introduceScroll()
{
  scrollCnt=0;
}

function endIntoTheStarsImg()
{
  isIntoTheStarsEnd=true;
 
}

$(document).ready(function() {
  $('#guestbookContent').on('keyup', function() {
      $('#guestbookContent_cnt').html("("+$(this).val().length+" / 200)");

      if($(this).val().length > 200) {
          $(this).val($(this).val().substring(0, 200));
          $('#guestbookContent_cnt').html("(200 / 200)");
      }
  });
});

//방명록 게시하기
async function guestbookCommitBtnClicked(event){
  event.preventDefault();

  var nickname="";
  if(document.getElementById("guestbookCommit_nickname").value == "") {
    nickname = $("#guestbookCommit_nickname").attr("placeholder");
  }
  else nickname = document.getElementById("guestbookCommit_nickname").value();

  var message="";
  if(guestbookContent.value=="") alert("방명록 내용을 입력해주세요.");
  else{
    const postGuestbookData = {
      writer: nickname,
      content: guestbookContent.value
    }
    postAPI(hostAddress, 'app/guestbook', postGuestbookData)
      .then((data) => {
        // console.log(data)
        // console.log(data.isSuccess);
        // console.log(data.message);
        if(data.isSuccess == false){
          alert("방명록을 작성에 실패했습니다.");
        }

        if(data.isSuccess == true){
          window.location.reload()
        }
      })
      .catch((error) => console.log(error));
      
    
  }

}

//post API
async function postAPI(host, path, body, headers = {}) {
  const url = `http://${host}/${path}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  };
  const res = await fetch(url, options);
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw new Error(data);
  }
}

//get API
async function getAPI(host, path, headers = {}) {
  const url = `http://${host}/${path}`;
  console.log(url);
  const options = {
    method: "GET"
  };
  const res = await fetch(url, options);
  const data = res.json();
  // console.log(res)
  // console.log(data)
  if (res.ok) {
    return data;
  } else {
    throw new Error(data);
  }
}

function getRandomArbitrary(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}