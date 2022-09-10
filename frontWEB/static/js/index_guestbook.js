const guestbookCommitBtn = document.getElementById("guestbookCommitBtn");
const guetbookPrevBtn = document.getElementById("guetbook-prev-btn");
const guetbookNextBtn = document.getElementById("guetbook-next-btn");

let guestbookPageCnt = 0;
let guestbookData;

async function getGuestbookData(){
  guestbookData = await getAPI(hostAddress, 'app/guestbook');
  showGuestbookData(guestbookPageCnt);
}

const animalNames =[
  "강아지", "고양이", "고릴라", "침팬지", "갈매기", "비둘기", "호랑이", "야옹이", "폼폼이", "재경이", "이시형", "전준휘", "별지기", "송골매",
  "강호동", "케로로", "호돌이", "코뿔소", "구렁이", "사다리", "북극곰", "탄지로", "뽀로로", "스컹크", "김동헌", "원숭이", "알파카"
]

  //랜덤 닉네임 생성하기
$("#guestbookCommit_nickname").attr("placeholder", "익명의 " + animalNames[getRandomArbitrary(0, animalNames.length)])

getGuestbookData();



//방명록 게시하기
guestbookCommitBtn.onclick = guestbookCommitBtnClicked;

//방명록 게시하기
async function guestbookCommitBtnClicked(event){
    event.preventDefault();
    var nickname="";
    if(document.getElementById("guestbookCommit_nickname").value == "") {
      nickname = $("#guestbookCommit_nickname").attr("placeholder");
    }
    else nickname = document.getElementById("guestbookCommit_nickname").value;
  
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
//방명록 전시하기
async function showGuestbookData(guestbookPageCnt){
    for(var i=0; i<5; i++)
    {
      console.log(guestbookPageCnt*5+i);
      if((guestbookPageCnt*5+i)<guestbookData.result.length)
      {
        var writer = guestbookData.result[guestbookPageCnt*5+i].writer;
        var time = guestbookData.result[guestbookPageCnt*5+i].createdAt.substring(0,10) + " " + guestbookData.result[guestbookPageCnt*5+i].createdAt.substring(11,16);
        var message = guestbookData.result[guestbookPageCnt*5+i].content;

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
      else break;
    }
}
  
  //방명록 이전, 다음 게시글 불러오기
  guetbookNextBtn.onclick = function(){
    if(((guestbookPageCnt+1)*5)<guestbookData.result.length)
    {
      $(".guestbook-area").empty();
      guestbookPageCnt = Number(guestbookPageCnt+1);
      showGuestbookData(Number(guestbookPageCnt));
    }
  }
  guetbookPrevBtn.onclick = function(){
    if((guestbookPageCnt-1)>=0)
    {
      $(".guestbook-area").empty();
      guestbookPageCnt = Number(guestbookPageCnt-1);
      showGuestbookData(Number(guestbookPageCnt));
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
  
  //get API AS JSON
  async function getAPI(host, path, headers = {}) {
    const url = `http://${host}/${path}`;
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
  
  //XML 형식 응답 -> json으로 반환하기
  async function getXMLAPI(host, path, headers = {}) {
    const url = `http://${host}/${path}`;
    //console.log(url);
    const options = {
      method: "GET"
    };
    const res = await fetch(url, options);
  
    var x2js = new X2JS();
    const data = JSON.stringify(x2js.xml_str2json(res));
    // console.log(res)
    // console.log(data)
    if (res.ok) {
      return data;
    } else {
      throw new Error(data);
    }
  }
  
  //min <-> max 사이 랜덤 숫자 반환
  function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }