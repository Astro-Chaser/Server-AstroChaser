let noticeBoardPage = 0;
const noticePrevBtn = document.getElementById("notice-prev-btn");
const noticeNextBtn = document.getElementById("notice-next-btn");
const noticeWriteBtn = document.getElementById("notice-write-btn");
let titleArr;
var formdata = new FormData();

window.onload = async function(){
    titleArr = await getChasingNoticeBoardTitles();
    showNormalNoticeBoardTitles(noticeBoardPage);
}

noticeWriteBtn.onclick = async ()=>{
    await adminCheck();
}

async function showNormalNoticeBoardTitles(page){
    html = ''

    for(var i = 0; i<10; i++){
        let title = titleArr[Number((page*10)+i)].title;
        if(title.length>70) title = title.substring(0,20)+'...'

        if(i==9 || Number((page*10)+i) == titleArr.length-1 ) {
            html += `
                <div class="removeColumns">
                    <div class="columns" onclick="location.href='/chasing/notice/${titleArr[Number((page*10)+i)].id}'">
                        <div class="column is-full" id="final-column">
                            <div class="noticeCol iconCol">${titleArr[Number((page*10)+i)].id}</div>
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
            <div class="columns" onclick="location.href='/chasing/notice/${titleArr[Number((page*10)+i)].id}'">
                <div class="column is-full">
                    <div class="noticeCol iconCol">${titleArr[Number((page*10)+i)].id}</div>
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


async function getChasingNoticeBoardTitles(){
    const getTitleRes = await getAPI(hostAddress, 'app/notice/title/chasing');
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

async function adminCheck(){
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("accessJWT"));
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    const adminCheckRes = await postAPI(hostAddress, 'app/users/auto-login', requestOptions);

    if(adminCheckRes.isSuccess == false){
        alert("로그인이 필요합니다.");
        location.href = "/user/signin";
    }
    if(adminCheckRes.result.member != "운영진") {
        alert("운영진만 글을 쓸 수 있는 게시판입니다.");
        location.href = "/chasing/notice";
    }
    if(adminCheckRes.result.member == "운영진"){
        location.href = "/chasing/notice/editor";
    }
}

//get API AS JSON
async function getAPI(host, path, headers ={}) {
    const url = `http://${host}/${path}`;
    console.log(url);
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

  //post API AS JSON
async function postAPI(host, path, options) {
    const url = `http://${host}/${path}`;
    console.log(url);
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