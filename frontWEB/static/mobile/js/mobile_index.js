const navBarHamberger = document.getElementById('mobile-nav-bar-hamburger');
const navBarArea = document.getElementsByClassName('mobile-nav-bar-area')[0];
showRandomGalleryPictures();
window.onload= function(){
  showNormalNoticeBoard();
  
}

async function showNormalNoticeBoard(){
  const getTitleRes = await getAPI(hostAddress, 'app/notice/title/normal');

  html = ''
  for(var i in getTitleRes.result){
      html += `<li onclick="location.href = '/notice/${getTitleRes.result[i].id}'"> ${getTitleRes.result[i].title} </li>`
      if(i>8) break;
  }
  $('.notice-list').append(html)
}

async function showRandomGalleryPictures(){
  const getRandomPictures = await getAPI(hostAddress, 'app/picture-board/pictures/all');

  getRandomIntInclusive(0, getRandomPictures.result.length);

  showPicHtml = `
            <div class="show-gallery-left">
              <img class="image-thumbnail" src="${getRandomPictures.result[getRandomIntInclusive(0, getRandomPictures.result.length)].mediaUrl}">
            </div>
            <div class="show-gallery-right">
            <img class="image-thumbnail" src="${getRandomPictures.result[getRandomIntInclusive(0, getRandomPictures.result.length)].mediaUrl}">
            </div>
            <div class="show-gallery-left">
            <img class="image-thumbnail" src="${getRandomPictures.result[getRandomIntInclusive(0, getRandomPictures.result.length)].mediaUrl}">
            </div>
            <div class="show-gallery-right">
            <img class="image-thumbnail" src="${getRandomPictures.result[getRandomIntInclusive(0, getRandomPictures.result.length)].mediaUrl}">
            </div>
  `
  $('.show-gallery-top').append(showPicHtml);
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

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}