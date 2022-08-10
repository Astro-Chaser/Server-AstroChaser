
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
    pictureBoardTitle = await getAPI(hostAddress, 'app/picture-board/title');  
    const contentRes = await getAPI(hostAddress, `app/picture-board/${pageNum}`);
    let html = `
    <h4 class="title is-4" style="color: white; margin-top: 8vh;">${contentRes.result[0].title}</h4>
    <p>🌟${contentRes.result[0].name} ${contentRes.result[0].createdAt.substring(0,10)}</p>
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

//댓글 보여주기
async function showComment(pageNum){
  const commentRes = await getAPI(hostAddress, `app/picture-board/comment/get?pageNum=${pageNum}`);
  $('.commentCount').append(`댓글 ${commentRes.result.length}개`)
  html = '';
  replyHtml = '';
  for(var i in commentRes.result){
    if(commentRes.result[i].upperCommentId == 0){
      html = `
        <div class="original-comment" id="reply-${commentRes.result[i].commentId}">
          <div class="comment-writer-info">⭐${commentRes.result[i].generation}기 ${commentRes.result[i].name} 
            <span class="writing-time">${commentRes.result[i].createdAt.substring(0,10)} ${commentRes.result[i].createdAt.substring(11,19)}</span> 
            <span class="reply-comment-area" onclick="showReplyTab(${commentRes.result[i].commentId})">답글쓰기</span>
          </div>
          <div class="comment-index">${commentRes.result[i].content}</div>
        </div>
        <div class="wring-comment-area reply" id="reply-text-area-${commentRes.result[i].commentId}" style="display: none;">
              <div class="commentCount">${commentRes.result[i].name}님에게 답글</div>
              <div class="control">
                <textarea class="textarea has-fixed-size" id="reply-comment-writing-textbox-${commentRes.result[i].commentId}" placeholder="댓글을 작성해주세요."></textarea>
              </div>
              <button class="button is-light" id="reply-comment-register-btn" onclick="postReplyComment(${commentRes.result[i].commentId}, 'reply-comment-writing-textbox-${commentRes.result[i].commentId}')">등록</button>
        </div>
        `
        $('.view-comment-area').append(html)
    }
    
  }

  for(var i in commentRes.result){
    if(commentRes.result[i].upperCommentId != 0){
      replyHtml ='';
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

function showReplyTab(hideDivId){
  var replyCommentArea = document.getElementById(`reply-text-area-${hideDivId}`);
  if (replyCommentArea.style.display == "none") {
    replyCommentArea.style.display = "block";
  } else {
    replyCommentArea.style.display = "none";
  }
}

async function postComment(){
  var myHeaders = new Headers();
  myHeaders.append("x-access-token", localStorage.getItem("accessJWT"));
  myHeaders.append("Content-Type", "application/json");


  var raw = JSON.stringify({
    "content": document.getElementById('comment-writing-textbox').value,
    "postId": pageNum,
    "upperId": 0
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const postCommentRes = await postAPI(hostAddress, 'app/picture-board/comment', requestOptions)
  if(postCommentRes.isSuccess == true) location.reload();
  else {
    console.log(postCommentRes)
    alert(postCommentRes.message)
    location.reload();
  }
}

async function postReplyComment(upperId, textareaId){
  var myHeaders = new Headers();
  myHeaders.append("x-access-token", localStorage.getItem("accessJWT"));
  myHeaders.append("Content-Type", "application/json");


  var raw = JSON.stringify({
    "content": document.getElementById(textareaId).value,
    "postId": pageNum,
    "upperId": upperId
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const postCommentRes = await postAPI(hostAddress, 'app/picture-board/comment', requestOptions)
  if(postCommentRes.isSuccess == true) location.reload();
  else {
    console.log(postCommentRes)
    alert(postCommentRes.message)
    location.reload();
  }
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

//post API AS JSON
async function postAPI(host, path, options) {
  const url = `http://${host}/${path}`;
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