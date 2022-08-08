
const queryString = window.location.href;
const getPageNum = queryString.lastIndexOf("/")
let pageNum = parseInt(queryString.substring(getPageNum+1));

const picturePrevBtn = document.getElementById("picture-prev-btn");
const pictureNextBtn = document.getElementById("picture-next-btn");
let pictureBoardTitle;

window.onload = function(){
    parseInt(pageNum)
    showContent(pageNum); 
    showComment(pageNum);
}

async function showContent(pageNum){ 
    const contentRes = await getAPI(hostAddress, `app/notice/normal/${pageNum}`);
    if(contentRes.isSuccess==false) location.href = '/notice'
    let html = `
    <h4 class="title is-4" style="color: white; margin-top: 8vh;">${contentRes.result[0].title}</h4>
    <p>🌟${contentRes.result[0].name} ${contentRes.result[0].createdat.substring(0,10)}</p>
    <hr class="title-hr">`

    for (var i in contentRes.result)
    {
      if(contentRes.result[i].mediaUrl == null) break;
        html += `
        <div class="image-area">
            <img src="${contentRes.result[i].mediaUrl}" width="500" >
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
}

//댓글 보여주기
async function showComment(pageNum){
  const commentRes = await getAPI(hostAddress, `app/notice/comment?pageNum=${pageNum}`);
  
  $('.commentCount').append(`댓글 ${commentRes.result.length}개`)
  html = '';
  replyHtml = '';
  for(var i in commentRes.result){
    if(commentRes.result[i].upperCommentId == 0){
      html = `
        <div class="original-comment" id="reply-${commentRes.result[i].commentId}">
          <div class="comment-writer-info">⭐${commentRes.result[i].generation}기 ${commentRes.result[i].name} 
            <span class="writing-time">${commentRes.result[i].createdAt.substring(0,10)} ${commentRes.result[i].createdAt.substring(11,19)}</span> 
            <span class="reply-comment-area">답글쓰기</span>
          </div>
          <div class="comment-index">${commentRes.result[i].content}</div>
        </div>
        `
        $('.view-comment-area').append(html)
    }
    
  }

  for(var i in commentRes.result){
    if(commentRes.result[i].upperCommentId != 0){
      replyHtml ='';
      console.log(commentRes.result[i])
      replyHtml = `
        <div class="reply-comment">
          <div class="comment-writer-info">➡️ ${commentRes.result[i].generation}기 ${commentRes.result[i].name} ${commentRes.result[i].createdAt.substring(0,10)} ${commentRes.result[i].createdAt.substring(11,19)}</div>
          <div class="comment-index">${commentRes.result[i].content}
        </div>
      
      `
      $(`#reply-${commentRes.result[i].upperCommentId}`).append(replyHtml);
    }
  }
  
  
}

//페이지 이전글, 다음글 불러오기
picturePrevBtn.onclick = function(){
  if((pageNum-1)>0)
  {
    pageNum -= 1;
    location.href=`/notice/${pageNum}`
  }
}
pictureNextBtn.onclick = function(){
  if(pageNum+1<= pictureBoardTitle.result.length)
  {
    pageNum += 1;
    location.href=`/notice/${pageNum}`
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