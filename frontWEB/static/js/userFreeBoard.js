let noticeBoardPage = 0;
const noticePrevBtn = document.getElementById("notice-prev-btn");
const noticeNextBtn = document.getElementById("notice-next-btn");
const noticeWriteBtn = document.getElementById("notice-write-btn");
let titleArr;


window.onload = async function(){
    titleArr = await getFreeNoticeBoardTitles();
    showUserNoticeBoardTitles(0);
}

noticeWriteBtn.onclick = function noticeWriteBtnClicked(event){
    if(localStorage.getItem("member")=="방문자")
    {
        alert("회원만 글을 작성할 수 있는 게시판입니다.");
    }
    else
    {
        location.href = `/free-board/editor`;
    }
}

async function showUserNoticeBoardTitles(page){
    html = ''

    for(var i = 0; i<10; i++){
        let title = titleArr[Number((page*10)+i)].title;
        if(title.length>23) title = title.substring(0,20)+'...'

        if(i==9 || Number((page*10)+i) == titleArr.length-1 ) {
            html += `
                <div class="removeColumns">
                    <div class="columns" onclick="location.href='/free-board/${titleArr[Number((page*10)+i)].id}'">
                        <div class="column is-full" id="final-column">
                            <div class="noticeCol iconCol"></div>
                            <div class="noticeCol titleCol">${title}</div>
                            <div class="noticeCol writerCol">${titleArr[Number((page*10)+i)].name}</div>
                            <div class="noticeCol timeCol">${titleArr[Number((page*10)+i)].createdat.substring(0, 10)}</div>
                            <div class="noticeCol watchCol">${titleArr[Number((page*10)+i)].viewCount}</div>
                        </div>
                    </div>
                </div>
                `
            $('.notice-list').append(html)
            break;
        }
        html += `
        <div class="removeColumns">
            <div class="columns" onclick="location.href='/free-board/${titleArr[Number((page*10)+i)].id}'">
                <div class="column is-full">
                    <div class="noticeCol iconCol"></div>
                    <div class="noticeCol titleCol">${title}</div>
                    <div class="noticeCol writerCol">${titleArr[Number(page*10 + i)].name}</div>
                    <div class="noticeCol timeCol">${titleArr[Number(page*10 + i)].createdat.substring(0, 10)}</div>
                    <div class="noticeCol watchCol">${titleArr[Number(page*10 + i)].viewCount}</div>
                </div>
            </div>
        </div>
        `
    }      
}


async function getFreeNoticeBoardTitles(){
    const getTitleRes = await getAPI(hostAddress, 'app/notice/title/user');
    let titleArr = new Array();
    for(var i in getTitleRes.result){
        let titleRes = new Object();
        titleRes.id = getTitleRes.result[i].id;
        titleRes.title = getTitleRes.result[i].title;
        titleRes.name = getTitleRes.result[i].name;
        titleRes.createdat = getTitleRes.result[i].createdat;
        titleRes.viewCount = getTitleRes.result[i].viewCount;

        titleArr.push(titleRes);
    }

    return titleArr;

}


//get API AS JSON
async function getAPI(host, path, headers ={}) {
    const url = `http://${host}/${path}`;
    const options = {
      method: "GET",
      headers: headers,
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