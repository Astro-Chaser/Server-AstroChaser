
const queryString = window.location.href;
const getPageNum = queryString.lastIndexOf("/")
let pageNum = parseInt(queryString.substring(getPageNum+1));

const picturePrevBtn = document.getElementById("picture-prev-btn");
const pictureNextBtn = document.getElementById("picture-next-btn");
let pictureBoardTitle;

window.onload = function(){
    parseInt(pageNum)
    showContent(pageNum); 
}

async function showContent(pageNum){
    pictureBoardTitle = await getAPI(hostAddress, 'app/picture-board/title');  
    const contentRes = await getAPI(hostAddress, `app/picture-board/${pageNum}`);
    let html = `
    <h3 class="title is-3" style="color: white; margin-top: 5vh;">${contentRes.result[0].title}</h1>
    <hr class="title-hr">`

    for (var i in contentRes.result)
    {
        html += `
        <div class="image-area">
            <img src="${contentRes.result[i].mediaUrl}" >
        </div>
        `
    }
    html +=
    `
        <div class="picture-content">
            ${contentRes.result[0].content}
        </div>
    `
    $(".mainContents").append(html);

    let titleHtml = '';
    for(var i in pictureBoardTitle.result){
      if(pictureBoardTitle.result[i].id == pageNum){
        if(i>0){
          titleHtml += `
          <div class="notice-tab" id="notice-next-tab" onclick="location.href = '/gallery/${pictureBoardTitle.result[i-1].id}'">
            <span class="tab-title">다음글</span>
            <span class="tab-content-title">${pictureBoardTitle.result[i-1].title}</span>
          </div>
          `
        }
        if(Number(i)+1<pictureBoardTitle.result.length){
          titleHtml += `
          <div class="notice-tab" id="notice-prev-tab" onclick="location.href = '/gallery/${pictureBoardTitle.result[Number(i)+1].id}'">
            <span class="tab-title">이전글</span>
            <span class="tab-content-title">${pictureBoardTitle.result[Number(i)+1].title}</span>
          </div>
          `
        }
        break;
      }
    }
    $('.noticeBoard-page-navigator').append(titleHtml);
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