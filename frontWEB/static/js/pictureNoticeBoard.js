const pictureWriteBtn = document.getElementById("picture-write-btn");
const picturePrevBtn = document.getElementById("picture-prev-btn");
const pictureNextBtn = document.getElementById("picture-next-btn");

let pictureBoardTitle;
let pictureBoardPageCnt = 0;

pictureWriteBtn.onclick = pictureWriteBtnClicked;

window.onload = async function(){
    showPictureNoticeBoard(0);
}

async function pictureWriteBtnClicked(event){
    const pictureBoardTitle = await getAPI(hostAddress, 'app/picture-board/title');
    console.log(pictureBoardTitle.result)
    if(localStorage.getItem("member")=="운영진")
    {
        location.href = `http://${hostAddress}/chasing-history/editor`;
    }
    else
    {
        alert("운영진만 글을 작성할 수 있는 게시판입니다.")
    }
}

//페이지 이전글, 다음글 불러오기
picturePrevBtn.onclick = function(){
    if((pictureBoardPageCnt-1)>=0)
    {
      $("#title-row1").empty();
      $("#title-row2").empty();
      $("#title-row3").empty();
      showPictureNoticeBoard(pictureBoardPageCnt-=1);
    }
}
pictureNextBtn.onclick = function(){
    if((pictureBoardPageCnt+1)<=pictureBoardTitle.result.length%9)
    {
        $("#title-row1").empty();
        $("#title-row2").empty();
        $("#title-row3").empty();
        showPictureNoticeBoard(pictureBoardPageCnt+=1);
    }
}

async function showPictureNoticeBoard(pictureBoardPageCnt){
    pictureBoardTitle = await getAPI(hostAddress, 'app/picture-board/title');
    console.log(pictureBoardTitle.result);
    console.log(pictureBoardTitle.result.length);

    for(var i=0; i<9; i++)
    {
        if((pictureBoardPageCnt*9+i) < pictureBoardTitle.result.length)
        {
            var title = pictureBoardTitle.result[pictureBoardPageCnt*9+i].title;
            var media = pictureBoardTitle.result[pictureBoardPageCnt*9+i].mediaUrl;

            if(i<3)
            {
                var html=` 
                <div class="tile is-parent">
                    <article class="tile is-child box" onclick="location.href='/chasing-history/${pictureBoardPageCnt*9+i+1}'">
                    <p class="title" style="font-size: 18px;">${title}</p>
                    <figure class="image is-4by3">
                        <img src="${media}">
                    </figure>
                    </article>
                </div>`;
                $("#title-row1").append(html);
            }
            else if(i==3 || i==4 || i==5)
            {
                var html=` 
                <div class="tile is-parent">
                    <article class="tile is-child box" onclick="location.href='/chasing-history/${pictureBoardPageCnt*9+i+1}'">
                    <p class="title" style="font-size: 18px;">${title}</p>
                    <figure class="image is-4by3">
                        <img src="${media}">
                    </figure>
                    </article>
                </div>`;
                $("#title-row2").append(html);
            }
            else if(i==6 || i==7 || i==8)
            {
                var html=` 
                <div class="tile is-parent">
                    <article class="tile is-child box" onclick="location.href='/chasing-history/${pictureBoardPageCnt*9+i+1}'">
                    <p class="title" style="font-size: 18px;">${title}</p>
                    <figure class="image is-4by3">
                        <img src="${media}">
                    </figure>
                    </article>
                </div>`;
                $("#title-row3").append(html);
            }
        }
    }
    
}

//get API AS JSON
async function getAPI(host, path, headers = {}) {
    const url = `http://${host}/${path}`;
    //console.log(url);
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