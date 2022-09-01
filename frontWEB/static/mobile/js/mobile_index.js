const navBarHamberger = document.getElementById('mobile-nav-bar-hamburger');
const navBarArea = document.getElementsByClassName('mobile-nav-bar-area')[0];

window.onload= function(){
  showNormalNoticeBoard();
}

window.addEventListener("scroll", function(event) {
  
  var top = this.scrollY;

  navBarArea.style.backgroundColor = `rgba(0, 0, 0, ${(top/600000)*1000})`

}, false);

async function showNormalNoticeBoard(){
  const getTitleRes = await getAPI(hostAddress, 'app/notice/title/normal');

  html = ''
  for(var i in getTitleRes.result){
      html += `<li onclick="location.href = '/notice/${getTitleRes.result[i].id}'"> ${getTitleRes.result[i].title} </li>`
      if(i>8) break;
  }
  $('.notice-list').append(html)
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